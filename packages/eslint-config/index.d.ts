import { UserConfigItem } from '@antfu/eslint-config'

declare function eslintConfig(config: { nuxt: boolean }): Promise<UserConfigItem[]>

export { eslintConfig, eslintConfig as default }
