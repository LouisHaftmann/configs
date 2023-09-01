/** @type {import("eslint").Linter.Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  root: true,
  extends: ['plugin:github/recommended', '@antfu', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'filenames/match-regex': 'off',
    'i18n-text/no-en': 'off',
    'no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
        builtinGlobals: true,
      },
    ],

    'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['debug'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'n/prefer-global/process': 'off',

    'antfu/prefer-inline-type-import': 'error',
    'antfu/if-newline': 'off',

    'yml/no-empty-mapping-value': 'off',

    '@typescript-eslint/consistent-type-definitions': 'off',
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

    // github
    'github/no-then': 'off',
    'github/require-passive-events': ['error'],
    'github/no-useless-passive': ['error'],
    'github/no-innerText': ['error'],
    'github/no-inner-html': ['error'],
    'github/no-dataset': ['error'],
    'github/get-attribute': ['error'],
    'github/async-preventdefault': ['error'],
    'github/async-currenttarget': ['error'],
    'github/a11y-svg-has-accessible-name': ['error'],
    'github/a11y-role-supports-aria-props': ['error'],
    'github/a11y-aria-label-is-well-formatted': ['error'],
  },
  overrides: [
    {
      files: ['docker-compose.yml', 'docker-compose.*.yml'],
      rules: {
        'yml/no-empty-mapping-value': 'off',
      },
    },
  ],
}
