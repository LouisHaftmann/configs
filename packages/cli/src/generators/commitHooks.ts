import {
  COMMITLINT_CONFIG_FILE,
  COMMITLINT_HUSKY_HOOK_FILE,
  LINT_STAGED_CONFIG_FILE,
  LINT_STAGEd_HUSKY_HOOK_FILE,
} from '../constants.js'
import { defineGenerator } from '../generators.js'

export default defineGenerator({
  devDependencies: [
    '@commitlint/cli',
    '@louishaftmann/commitlint-config',
    'lint-staged',
    '@louishaftmann/lintstaged-config',
    'husky',
  ],
  async generate(ctx, io) {
    if (!(await io.prompts.yesNo('Add commit hooks?'))) {
      return
    }

    await Promise.all([
      // commit lint
      io.fs.writeFile(
        COMMITLINT_CONFIG_FILE,
        `module.exports = {\n  extends: ['@louishaftmann/commitlint-config'],\n}`,
      ),

      // lint staged
      io.fs.writeFile(
        LINT_STAGED_CONFIG_FILE,
        `import lintstagedConfig from '@louishaftmann/lintstaged-config'\n\nexport default {\n  ...lintstagedConfig\n}`,
      ),

      // husky
      io.helpers.updatePackageJson({
        scripts: {
          prepare: 'husky install .husky',
        },
      }),

      io.fs.writeFile(
        COMMITLINT_HUSKY_HOOK_FILE,
        `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\npnpm commitlint --edit "$1"`,
      ),
      io.fs.writeFile(
        LINT_STAGEd_HUSKY_HOOK_FILE,
        `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\npnpm lint-staged`,
      ),
    ])
  },
})
