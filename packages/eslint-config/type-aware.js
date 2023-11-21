import * as tsESLintParserForExtraFiles from 'typescript-eslint-parser-for-extra-files'
import vueESLintParser from 'vue-eslint-parser'

/**
 * @param tsconfigPath {string[]}
 * @returns {import('@antfu/eslint-config').UserConfigItem[]}
 */
export default (tsconfigPath) => [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsESLintParserForExtraFiles,
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
