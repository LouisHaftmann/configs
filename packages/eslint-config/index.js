import { FlatCompat } from '@eslint/eslintrc'
import antfu, { combine } from '@antfu/eslint-config'

import github from './github.js'
import nuxtRules from './nuxt.js'

const compat = new FlatCompat()

/** @type {import('./index.d.ts').eslintConfig} */
export async function eslintConfig(
  { nuxt, tsconfigPath, configs } = { nuxt: false, tsconfigPath: undefined, configs: undefined },
) {
  return await combine(
    github,
    await antfu(
      {
        stylistic: false,

        typescript: {
          tsconfigPath: tsconfigPath,
        },
      },
      {
        // type aware rules break with type imports used in / from vue components
        files: ['**/*.vue'],
        rules: {
          'ts/no-unsafe-assignment': 'off',
          'ts/no-unsafe-call': 'off',
          'ts/no-unsafe-return': 'off',
          'ts/no-unsafe-argument': 'off',
          'ts/no-unsafe-member-access': 'off',
        },
      },

      compat.extends('prettier'),

      {
        rules: {
          'import/extensions': 'off',
          'filenames/match-regex': 'off',
          'i18n-text/no-en': 'off',
          'no-shadow': ['error', { ignoreOnInitialization: true }],

          'no-console':
            process.env.NODE_ENV === 'production' ? ['warn', { allow: ['debug'] }] : 'off',
          'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

          'node/prefer-global/process': 'off',

          'yaml/no-empty-mapping-value': 'off',
          'yaml/quotes': 'off',

          'ts/consistent-type-definitions': 'off',
          'vue/require-component-is': 'off',

          'jsonc/indent': 'off',

          'import/order': [
            'warn',
            {
              'groups': [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
                'type',
              ],
              'pathGroups': [
                {
                  pattern: '~/**',
                  group: 'internal',
                },
              ],
              'newlines-between': 'always',
              'alphabetize': {
                order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
                caseInsensitive: false,
              },
            },
          ],
        },
      },
      {
        files: ['docker-compose.yml', 'docker-compose.*.yml'],
        rules: {
          'yaml/no-empty-mapping-value': 'off',
        },
      },
      {
        files: ['*.cjs', '*.cts'],
        rules: {
          'import/no-commonjs': 'off',
        },
      },

      // Nuxt
      ...(nuxt ? nuxtRules : []),

      // custom
      ...(configs ?? [])
    ),
  )
}

export default eslintConfig
