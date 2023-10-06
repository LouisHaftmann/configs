import {
  ESLINT_IGNORE_FILE,
  GITHUB_MAIN_WORKFLOW_FILE,
  PRETTIER_CONFIG_FILE,
  PRETTIER_IGNORE_FILE,
  VSCODE_SETTINGS_FILE,
} from '../constants.js'
import { defineGenerator } from '../generators.js'
import { mainWorkflow } from '../templates/githubWorkflows.js'

export default defineGenerator({
  devDependencies: [
    'eslint',
    '@louishaftmann/eslint-config',
    'prettier',
    '@louishaftmann/prettier-config',
  ],
  async generate(ctx, io) {
    if (!(await io.prompts.yesNo('Add linting and formatting?'))) {
      return
    }

    await Promise.all([
      // eslint
      io.helpers.updateEslintConfig({
        extends: ['@louishaftmann'],
      }),
      io.fs.writeFile(
        ESLINT_IGNORE_FILE,
        ['!.*', 'node_modules/', 'dist/', '.nuxt/', '.output/', '.temp/'].join('\n'),
      ),

      // prettier
      io.fs.writeFile(
        PRETTIER_CONFIG_FILE,
        `module.exports = require('@louishaftmann/prettier-config')`,
      ),

      io.fs.writeFile(
        PRETTIER_IGNORE_FILE,
        ['dist/', '.nuxt/', '.output/', '.temp/', 'pnpm-lock.yaml', 'node_modules/'].join('\n'),
      ),

      // misc
      io.helpers.updatePackageJson({
        scripts: {
          'lint': 'eslint --cache . && prettier --check --cache .',
          'lint:fix': 'eslint --fix --cache . && prettier --write --cache .',
        },
      }),
      io.fs.mergeJsonFile(VSCODE_SETTINGS_FILE, {
        'prettier.enable': true,
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.fixAll.eslint': true,
          'source.organizeImports': false,
        },
        'eslint.validate': [
          'javascript',
          'javascriptreact',
          'typescript',
          'typescriptreact',
          'vue',
          'html',
          'markdown',
          'json',
          'jsonc',
          'yaml',
        ],
      }),

      // github ci
      io.fs.writeFile(GITHUB_MAIN_WORKFLOW_FILE, mainWorkflow),
    ])
  },
})
