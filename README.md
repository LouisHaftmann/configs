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

**`eslint.config.js`:**

> [!NOTE]
> For `import`s to work, you need to set `"type": "module"` in your `package.json`

```js
// @ts-check

// optional, if you have old eslint configs you want to use
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfig from '@louishaftmann/eslint-config'

const compat = new FlatCompat()

export default eslintConfig({
  nuxt: true,
  tsconfigPath: ['./tsconfig.json', './modules/tsconfig.json', './server/tsconfig.json'],
})
  .append(compat.extends('plugin:@tanstack/eslint-plugin-query/recommended'))
  .append({
    ignores: ['.prettierrc.cjs', '.lintstagedrc.mjs'],
  })
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

> [!WARNING]
> When configured inside a pnpm workspace package, pass the package name as a parameter.
>
> e.g. `lintstagedConfig('web')`

```js
import lintstagedConfig from '@louishaftmann/lintstaged-config'

export default {
  ...lintstagedConfig(),
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
    "ci:lint": "eslint --cache --cache-strategy content . && prettier --check --cache --cache-strategy content .",
    "lint:fix": "eslint --fix --cache . && prettier --write --cache ."
  }
}
```
