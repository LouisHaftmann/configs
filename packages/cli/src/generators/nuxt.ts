import { loadFile } from 'magicast'
import { addNuxtModule } from 'magicast/helpers'
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
    const componentPrefix = await io.prompts.text('Nuxt Component prefix:').then((s) => s?.trim())

    await io.helpers.updateNuxtConfig({
      app: {
        head: {
          link: [
            {
              rel: 'icon',
              type: 'image/x-icon',
              href: '/favicon.ico',
            },
          ],
        },
      },
      components: {
        dirs: [
          {
            path: '~/components/',
            prefix: componentPrefix || undefined,
            pathPrefix: false,
          },
        ],
      },
      imports: {
        dirs: ['composables/*/index.{ts,js,mjs,mts}', 'composables'],
      },
      typescript: {
        shim: false,
      },
      spaLoadingTemplate: false,
    })
  },
})
