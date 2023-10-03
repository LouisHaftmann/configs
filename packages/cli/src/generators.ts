import { createConsola } from 'consola'
import { defu } from 'defu'
import fs, { ensureDir } from 'fs-extra'
import { loadFile, writeFile as writeJsFile } from 'magicast'
import { deepMergeObject } from 'magicast/helpers'
import pathe from 'pathe'
import { equals } from 'remeda'

import { ESLINT_CONFIG_FILE, PACKAGE_JSON_FILE } from './constants.js'

export interface GeneratorContext<C = undefined> {
  isMonorepo: boolean
  isNuxtProject: boolean
  custom: C
  packagesJson: Record<string, any>
  addDevDependencies: (...dependencies: string[]) => void
  addDependencies: (...dependencies: string[]) => void
}

const logger = createConsola()
export function createGeneratorIO() {
  const rootDir = process.cwd()

  const fsHelpers = {
    async readFile(path: string) {
      const absolutePath = pathe.join(rootDir, path)

      return fs
        .readFile(absolutePath)
        .then((buffer) => buffer.toString())
        .catch(() => undefined)
    },
    async writeFile(path: string, content: string) {
      const absolutePath = pathe.join(rootDir, path)

      await fs.ensureDir(pathe.dirname(absolutePath))
      return fs.writeFile(absolutePath, content)
    },
    async mergeJsonFile(path: string, content: Record<string, unknown>) {
      const absolutePath = pathe.join(rootDir, path)

      const existingContent = await fs
        .readFile(absolutePath)
        .then((buffer) => buffer.toString())
        .catch(() => undefined)

      const existingJson = existingContent ? JSON.parse(existingContent) : {}
      const newJson = defu(existingJson, content)

      if (equals(existingJson, newJson)) {
        return
      }

      await ensureDir(pathe.dirname(absolutePath))
      await fs.writeFile(absolutePath, JSON.stringify(newJson, null, 2))
    },
  }
  return {
    prompts: {
      yesNo: async (message: string, initial = true) =>
        logger.prompt(message, {
          type: 'confirm',
          initial,
        }),
      multiselect: async <T extends readonly string[] | string[]>(message: string, choices: T) =>
        logger.prompt(message, {
          type: 'multiselect',
          options: choices.map((choice) => choice),
        }) as Promise<T[number][]>,
      text: async (message: string) =>
        logger.prompt(message, {
          type: 'text',
        }),
    },
    logger,
    fs: fsHelpers,
    helpers: {
      async updateEslintConfig(config: Record<string, unknown>) {
        return fsHelpers.mergeJsonFile(ESLINT_CONFIG_FILE, config)
      },
      async updatePackageJson(config: Record<string, unknown>) {
        return fsHelpers.mergeJsonFile(PACKAGE_JSON_FILE, config)
      },
      async updateNuxtConfig(newConfig: Record<string, unknown>) {
        const configModule = await loadFile('nuxt.config.ts')
        const config = configModule.exports.default.$args[0]

        if (!config) {
          throw new Error('Could not find default export in nuxt.config.ts')
        }

        if (Array.isArray(newConfig.modules)) {
          config.modules ||= []
          config.modules.push(...newConfig.modules)
          config.modules = [...new Set(config.modules)]
          delete newConfig.modules
        }

        configModule.exports.default.$args[0] = defu(config, newConfig)

        await writeJsFile(configModule, 'nuxt.config.ts', {
          quote: 'single',
          useTabs: false,
          tabWidth: 2,
        })
      },
    },
  }
}
export type GeneratorIO = ReturnType<typeof createGeneratorIO>

export interface Generator<C> {
  setup?: (ctx: GeneratorContext, io: GeneratorIO) => Promise<C>
  generate: (ctx: GeneratorContext<C>, io: GeneratorIO) => Promise<void>
  devDependencies?: string[]
  dependencies?: string[]
}

export function defineGenerator<C extends Record<string, unknown> | undefined>(
  generator: Generator<C>,
) {
  return generator
}
