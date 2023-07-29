# @louishaftmann/eslint-config & @louishaftmann/prettier-config

this is a fork of [antfu's eslint config](https://https://github.com/antfu/eslint-config) with some changes to fit my needs

## Usage

### Install

```bash
pnpm i -D prettier eslint @louishaftmann/eslint-config @louishaftmann/prettier-config
```

### Create `.eslintrc`

```json
{
  "extends": ["@louishaftmann"]
}
```

### Create `.prettierrc.js`

```js
module.exports = require('@louishaftmann/prettier-config')
```

### Create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
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
