import {
  COMMITLINT_CONFIG_FILE,
  COMMITLINT_HUSKY_HOOK_FILE,
  LINT_STAGED_CONFIG_FILE,
  LINT_STAGEd_HUSKY_HOOK_FILE,
} from '../constants.js'
import { defineGenerator } from '../generators.js'

export default defineGenerator({
  devDependencies: ['concurrently'],
  async generate(ctx, io) {
    if (!(await io.prompts.yesNo('Add support for multiple dev commands?'))) {
      return
    }

    const existingDevCommand = ctx.packagesJson.scripts?.dev
    io.helpers.updatePackageJson({
      scripts: {
        'dev': "concurrently -n dev: 'npm:dev:*' -s all -k -p '{name}' -c 'ADD_COLOR'",
        'dev:old': existingDevCommand,
      },
    })
  },
})
