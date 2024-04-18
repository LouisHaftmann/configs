import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

const REMOVE_RULES = ['import/', 'prettier/', 'eslint-comments/', 'camelcase']

const github = compat.extends('plugin:github/recommended').map((configItem) => {
  if (configItem.rules) {
    Object.keys(configItem.rules).forEach((rule) => {
      if (REMOVE_RULES.some((r) => rule.startsWith(r))) {
        delete configItem.rules[rule]
      }
    })
  }

  if (configItem.settings) {
    delete configItem.settings['import/resolver']
  }

  if (configItem.plugins) {
    delete configItem.plugins['eslint-comments']
    delete configItem.plugins['import']
    delete configItem.plugins['prettier']
  }

  return configItem
})

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...github,
  {
    rules: {
      'github/no-then': 'off',

      // browser
      'github/async-currenttarget': 'error',
      'github/async-preventdefault': 'error',
      'github/get-attribute': 'error',
      // 'github/no-blur': 'error',
      'github/no-dataset': 'error',
      'github/no-innerText': 'error',
      'github/no-inner-html': 'error',
      'github/unescaped-html-literal': 'error',
      'github/no-useless-passive': 'error',
      'github/require-passive-events': 'error',
      'github/prefer-observers': 'error',

      // a11y
      'github/a11y-aria-label-is-well-formatted': 'error',
      'github/a11y-no-visually-hidden-interactive-element': 'error',
      'github/a11y-no-title-attribute': 'error',
      'github/a11y-svg-has-accessible-name': 'error',
      'github/a11y-role-supports-aria-props': 'error',
    },
  },
]
