# my eslint & prettier config

this extends [antfu's eslint config](https://github.com/antfu/eslint-config) with included feedback from [DrJume](https://github.com/DrJume)

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
