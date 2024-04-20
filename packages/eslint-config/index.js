import antfu from '@antfu/eslint-config'

import github from './github.js'
import nuxtRules from './nuxt.js'

import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('./index.d.ts').eslintConfig} */
export function eslintConfig(
  { nuxt, tsconfigPath, configs } = { nuxt: false, tsconfigPath: undefined, configs: undefined },
) {
  return antfu({
    stylistic: false,

    typescript: {
      tsconfigPath: tsconfigPath,
    },

    vue: {
      overrides: {
        // force <script lang="ts">
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        // force @click="handler()"
        'vue/v-on-handler-style': ['error', 'inline'],
      },
    },
  })
    .prepend(github)
    .append(nuxt ? nuxtRules : [])
    .append({
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

        // prefer `test` over `it` because it makes the test name more readable (no `should`)
        'test/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
      },
    })
    .append(
      {
        files: ['*.cjs', '*.cts'],
        rules: { 'import/no-commonjs': 'off' },
      },
      {
        files: ['docker-compose.yml', 'docker-compose.*.yml'],
        rules: { 'yaml/no-empty-mapping-value': 'off' },
      },
    )
    .append(configs ?? [])
    .append(eslintConfigPrettier)
  // .append({
  //   // type aware rules break with type imports used in / from vue components
  //   files: ['**/*.vue'],
  //   rules: {
  //     'ts/no-unsafe-assignment': 'off',
  //     'ts/no-unsafe-call': 'off',
  //     'ts/no-unsafe-return': 'off',
  //     'ts/no-unsafe-argument': 'off',
  //     'ts/no-unsafe-member-access': 'off',
  //   },
  // })
}

export default eslintConfig
