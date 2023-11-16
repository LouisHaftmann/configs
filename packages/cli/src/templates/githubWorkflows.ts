export const mainWorkflow = `name: CI
on:
  push:
    branches:
      - '**'

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20.x
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint

  type-check:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20.x
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm run type-check

`
