import { loadFile } from 'magicast'
import { P, match } from 'ts-pattern'

import {
  COMMITLINT_CONFIG_FILE,
  COMMITLINT_HUSKY_HOOK_FILE,
  LINT_STAGED_CONFIG_FILE,
  LINT_STAGEd_HUSKY_HOOK_FILE,
} from '../constants.js'
import { defineGenerator } from '../generators.js'
import { vueQueryPlugin } from '../templates/nuxtPlugins.js'
import {
  trpcApi,
  trpcContext,
  trpcHook,
  trpcMain,
  trpcPlugin,
  trpcRouter,
} from '../templates/nuxtTrpc.js'

export default defineGenerator({
  async generate(ctx, io) {
    const packages = [
      'pinia',
      'vue-query',
      'trpc',
      'vee-validate',
      'vue-use',
      'luxon',
      'remeda',
      'ts-pattern',
      'zod',
      '@nuxt/ui',
      '@nuxtjs/google-fonts',
    ] as const
    const selectedPackages = await io.prompts.multiselect('Select additional packages:', packages)

    for (const pkg of selectedPackages)
      await match(pkg)
        .with(P.union('luxon', 'remeda', 'ts-pattern', 'zod'), (p) => ctx.addDependencies(p))
        .with('vee-validate', () => ctx.addDependencies('zod', 'vee-validate', '@vee-validate/zod'))
        .with('pinia', async () => {
          ctx.addDependencies('@pinia/nuxt', 'pinia')
          await io.helpers.updateNuxtConfig({
            modules: ['@pinia/nuxt'],
          })
        })
        .with('vue-use', async () => {
          ctx.addDependencies('@vueuse/nuxt', '@vueuse/core')
          await io.helpers.updateNuxtConfig({
            modules: ['@vueuse/nuxt'],
          })
        })
        .with('vue-query', async () => {
          ctx.addDependencies('@tanstack/vue-query')

          await io.fs.writeFile('plugins/query.ts', vueQueryPlugin)
        })
        .with('trpc', async () => {
          ctx.addDependencies('trpc-nuxt', 'h3', '@trpc/client', '@trpc/server')

          await Promise.all([
            io.helpers.updateNuxtConfig({
              build: {
                transpile: ['trpc-nuxt'],
              },
            }),
            io.fs.writeFile('plugins/trpc.ts', trpcPlugin),
            io.fs.writeFile('server/trpc/trpc.ts', trpcMain),
            io.fs.writeFile('server/trpc/context.ts', trpcContext),
            io.fs.writeFile('server/trpc/routers/index.ts', trpcRouter),
            io.fs.writeFile('server/api/trpc/[trpc].ts', trpcApi),
            io.fs.writeFile('composables/trpc.ts', trpcHook),
          ])
        })
        .with('@nuxt/ui', async () => {
          ctx.addDependencies('@nuxt/ui', '@iconify-json/ph')
          await io.helpers.updateNuxtConfig({
            modules: ['@nuxt/ui'],
            ui: {
              global: true,
              icons: ['ph'],
            },
            colorMode: {
              preference: 'dark',
              fallback: 'dark',
            },
          })
        })
        .with('@nuxtjs/google-fonts', async () => {
          ctx.addDependencies('@nuxtjs/google-fonts')
          await io.helpers.updateNuxtConfig({
            modules: ['@nuxtjs/google-fonts'],
            googleFonts: {
              families: {
                Roboto: true,
              },
            },
          })
        })
        .exhaustive()
  },
})
