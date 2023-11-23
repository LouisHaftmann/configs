# my configs

[![npm](https://img.shields.io/npm/v/%40louishaftmann/eslint-config?label=eslint-config)](https://npmjs.com/package/@louishaftmann/eslint-config)
[![npm](https://img.shields.io/npm/v/%40louishaftmann/prettier-config?label=prettier-config)](https://npmjs.com/package/@louishaftmann/prettier-config)
[![npm](https://img.shields.io/npm/v/%40louishaftmann/commitlint-config?label=commitlint-config)](https://npmjs.com/package/@louishaftmann/commitlint-config)
[![npm](https://img.shields.io/npm/v/%40louishaftmann/lintstaged-config?label=lintstaged-config)](https://npmjs.com/package/@louishaftmann/lintstaged-config)

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
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "eslint.experimental.useFlatConfig": true,
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
    "lint": "eslint --cache . && prettier --check --cache .",
    "lint:fix": "eslint --fix --cache . && prettier --write --cache .",
  }
}
```
