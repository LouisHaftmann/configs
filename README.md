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
  tsconfigPath: './tsconfig.json',
})
  .append(compat.extends('plugin:@tanstack/eslint-plugin-query/recommended'))
  .append({
    ignores: [],
  })
```

#### `eslint-plugin-compat` Target Browsers

Browser targets are configured using [browserslist](https://github.com/browserslist/browserslist). You can configure browser targets in your `package.json`:

##### `package.json`

```jsonc
{
  // ...
  "browserslist": [
    "> 0.5% in DE, last 3 versions, Firefox ESR, not dead and fully supports es6-module",
    "maintained node versions",
  ],
}
```

If no configuration is found, browserslist [defaults to](https://github.com/browserslist/browserslist#queries) `"> 0.5%, last 2 versions, Firefox ESR, not dead"`.

See [browserslist/browserslist](https://github.com/browserslist/browserslist) for more details.

### Prettier

**`prettier.config.js`:**

```js
export { default } from '@louishaftmann/prettier-config'
```

### commitlint

**`commitlint.config.cjs`:**

<!-- eslint-disable unicorn/prefer-module -->

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
    "yaml",
    "dockercompose"
  ]
}
```

### lint-staged

**`.lintstagedrc.js`:**

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
    "prepare": "husky",
    "lint": "eslint --cache . && prettier --check --cache .",
    "ci:lint": "eslint --cache --cache-strategy content . && prettier --check --cache --cache-strategy content .",
    "lint:fix": "eslint --fix --cache . && prettier --write --cache ."
  }
}
```
