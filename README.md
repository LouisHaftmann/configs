# my configs

## Cool people and projects

- [antfu's eslint config](https://github.com/antfu/eslint-config)
- [DrJume](https://github.com/DrJume)

## Install

```bash
pnpm i -D prettier eslint lint-staged @commitlint/cli @louishaftmann/eslint-config @louishaftmann/prettier-config @louishaftmann/commitlint-config @louishaftmann/lintstaged-config
```

## Config

### ESLint

**`.eslintrc.json`:**

```json
{
  "extends": ["@louishaftmann"]
}
```

### Prettier

**`.prettierrc.cjs`:**

```js
module.exports = require('@louishaftmann/prettier-config')
```

### commitlint

**`commitlint.config.cjs`:**
```js
module.exports = {
  extends: ['@louishaftmann/commitlint-config'],
}
```

### VSCode settings

**`.vscode/settings.json`:**

```json
{
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

### lint-staged

**`.lintstagedrc.mjs`:**

```js
import lintstagedConfig from '@louishaftmann/lintstaged-config'

export default {
  ...lintstagedConfig
}
```

### Ignore files

**`.eslintignore`:**

```ignore
!.*
node_modules/
dist/
.nuxt/
.output/
.temp/
```

**`.prettierignore`:**

```ignore
dist/
.nuxt/
.output/
.temp/

pnpm-lock.yaml
```

### Package scripts

**`package.json`:**

```json
{
  "scripts": {
    "prepare": "husky install .husky",
    "lint": "eslint . && prettier --check .",
    "lint:fix": "eslint --fix --cache . && prettier --write --cache ."
  }
}
```
