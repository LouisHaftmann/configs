# my eslint & prettier config

this extends [antfu's eslint config](https://github.com/antfu/eslint-config) with included feedback from [DrJume](https://github.com/DrJume)

## Install

```bash
pnpm i -D prettier eslint @louishaftmann/eslint-config @louishaftmann/prettier-config lint-staged
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
export default {
  '*.{vue,?([cm])[jt]s?(x),y?(a)ml,json?(c),md,html,?(s)css}': [
    'eslint --fix --cache',
    'prettier --write --cache',
  ],
  '*.{vue,?([cm])ts?(x)}': () => 'vue-tsc -p tsconfig.json --noEmit --composite false', // run once for all files
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


