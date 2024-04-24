import * as tsESLintParserForExtraFiles from 'typescript-eslint-parser-for-extra-files'
import vueESLintParser from 'vue-eslint-parser'

/**
 * @param tsconfigPath {string[]}
 * @returns {import('eslint').Linter.FlatConfig[]} FlatConfig[]
 */
export default (tsconfigPath) => [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      /** @type {any} */ parser: tsESLintParserForExtraFiles,
      parserOptions: {
        project: tsconfigPath,
        // extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueESLintParser,
      parserOptions: {
        parser: tsESLintParserForExtraFiles,
        // extraFileExtensions: ['.vue'],
        // Or
        // parser: {
        //   ts: tsESLintParserForExtraFiles
        // }
        project: tsconfigPath,
      },
    },
  },
]
