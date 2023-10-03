import { defineCommand } from 'citty'
import fs from 'fs-extra'

import { generators } from './generators/index.js'
import { type GeneratorContext, createGeneratorIO } from './generators.js'
import { installDependencies } from './utils.js'

export const main = defineCommand({
  meta: {
    name: 'main',
    version: '1.0.0',
    description: 'Main command',
  },
  async setup() {},
  async run() {
    const isNuxtProject = await fs.exists('nuxt.config.ts')

    const defaultContext = {
      isMonorepo: false,
      isNuxtProject,
      custom: undefined,
      packagesJson: JSON.parse(await fs.readFile('package.json', 'utf-8')),
      addDependencies: () => {},
      addDevDependencies: () => {},
    } satisfies GeneratorContext
    const io = createGeneratorIO()

    const devDependencies = [] as string[]
    const dependencies = [] as string[]
    for (const generator of generators) {
      devDependencies.push(...(generator.devDependencies ?? []))
      dependencies.push(...(generator.dependencies ?? []))

      await generator.generate(
        {
          ...defaultContext,
          addDependencies: (...deps) => dependencies.push(...deps),
          addDevDependencies: (...deps) => devDependencies.push(...deps),
          custom: generator.setup ? await generator.setup(defaultContext, io) : undefined,
        },
        io,
      )
    }

    await installDependencies(dependencies, devDependencies)
  },
})
