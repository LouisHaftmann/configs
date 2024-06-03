import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'

import github from './github.js'
import nuxtRules from './nuxt.js'

delete eslintConfigPrettier.rules['vue/html-self-closing']

const compat = new FlatCompat()

/** @type {import('./index.d.ts').eslintConfig} */
export function eslintConfig(
  { nuxt, tsconfigPath, configs } = { nuxt: false, tsconfigPath: undefined, configs: undefined },
) {
  return antfu({
    stylistic: false,

    typescript: {
      tsconfigPath,
    },

    vue: {
      overrides: {
        // force <script lang="ts">
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        // force @click="handler()"
        'vue/v-on-handler-style': ['error', 'inline-function'],

        'vue/html-self-closing': [
          'warn',
          {
            html: { void: 'always', normal: 'always', component: 'always' },
            svg: 'always',
            math: 'always',
          },
        ],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/require-typed-ref': 'error',
        'vue/require-macro-variable-name': 'error',
        'vue/require-explicit-slots': 'error',
        'vue/no-root-v-if': 'warn',
        'vue/no-ref-object-reactivity-loss': 'warn',
        'vue/no-duplicate-attr-inheritance': 'error',
        'vue/define-emits-declaration': ['error', 'type-literal'],
        'vue/define-props-declaration': ['error', 'type-based'],
      },
    },
  })
    .prepend(github)
    .append(nuxt ? nuxtRules : [])
    .append({
      name: 'falcondev/rules',
      rules: {
        'no-shadow': ['error', { ignoreOnInitialization: true }],

        'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'trace'] }],

        'node/prefer-global/process': 'off',

        'yaml/no-empty-mapping-value': 'off',
        'yaml/quotes': 'off',

        'ts/consistent-type-definitions': 'off',
        'ts/strict-boolean-expressions': 'off',

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

        'antfu/top-level-function': 'error',

        'yoda': ['error', 'never', { exceptRange: true }],
      },
    })
    .append({
      name: 'falcondev/shopify',
      ...compat.plugins('@shopify/eslint-plugin')[0],
      rules: {
        '@shopify/prefer-early-return': 'error',
      },
    })
    .append(
      {
        name: 'falcondev/cjs',
        files: ['*.cjs', '*.cts'],
        rules: { 'import/no-commonjs': 'off' },
      },
      {
        name: 'falcondev/yaml',
        files: ['docker-compose.yml', 'docker-compose.*.yml'],
        rules: { 'yaml/no-empty-mapping-value': 'off' },
      },
    )
    .append(configs ?? [])
    .append({
      name: 'prettier/disables',
      ...eslintConfigPrettier,
    })
}

export default eslintConfig
