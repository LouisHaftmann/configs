import antfu from '@antfu/eslint-config'
import shopifyEslintPlugin from '@shopify/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginCompat from 'eslint-plugin-compat'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { loadPackageJSON } from 'local-pkg'

import github from './github.js'
import nuxtRules from './nuxt.js'

delete eslintConfigPrettier.rules['vue/html-self-closing']

/** @type {import('./index.d.ts').eslintConfig} */
export function eslintConfig({ nuxt = false, tsconfigPath }) {
  return antfu({
    stylistic: false,

    typescript: {
      tsconfigPath,
    },

    vue: {
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
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
    .override('antfu/unicorn/rules', (config) => {
      delete config.plugins
      return config
    })
    .insertBefore('antfu/unicorn/rules', eslintPluginUnicorn.configs['flat/recommended'])
    .append([
      {
        name: 'falcondev/unicorn/rules',
        rules: {
          'unicorn/filename-case': [
            'error',
            {
              case: 'kebabCase',
              ignore: [/^README\./],
            },
          ],
          'unicorn/prevent-abbreviations': 'off',
          'unicorn/no-null': 'off',
          'unicorn/no-array-callback-reference': 'off',
          'unicorn/prefer-ternary': 'off',
          'unicorn/catch-error-name': ['error', { name: 'err' }],
          'unicorn/no-abusive-eslint-disable': 'off',
        },
      },
      {
        name: 'falcondev/unicorn/overrides',
        files: ['**/composables/**/*'],
        rules: { 'unicorn/filename-case': ['error', { case: 'camelCase' }] },
      },
      {
        name: 'falcondev/unicorn/overrides',
        files: ['**/components/**/*'],
        rules: { 'unicorn/filename-case': ['error', { case: 'pascalCase' }] },
      },
      {
        name: 'falcondev/unicorn/overrides',
        files: [String.raw`**/pages/**/*\[*\]*.vue`],
        rules: { 'unicorn/filename-case': 'off' },
      },
      {
        name: 'falcondev/unicorn/ignore',
        files: ['.github/**/*', '**/prisma/migrations/**/*', '**/db/migrations/meta/**/*'],
        rules: { 'unicorn/filename-case': 'off' },
      },
    ])
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

        'github/unescaped-html-literal': 'off',
      },
    })
    .append({
      name: 'falcondev/shopify',
      plugins: { '@shopify': shopifyEslintPlugin },
      rules: {
        '@shopify/prefer-early-return': 'error',
        '@shopify/typescript-prefer-pascal-case-enums': 'error',
        '@shopify/typescript-prefer-singular-enums': 'error',
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
    .append(
      (async () => {
        const packageJSON = await loadPackageJSON()
        if (!('browserslist' in packageJSON)) return

        return eslintPluginCompat.configs['flat/recommended']
      })(),
    )
    .append({
      name: 'prettier/disables',
      ...eslintConfigPrettier,
    })
}

export default eslintConfig
