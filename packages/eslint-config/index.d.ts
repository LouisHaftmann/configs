import { UserConfigItem } from '@antfu/eslint-config'

declare function eslintConfig(config: {
  nuxt: boolean
  tsconfigPath?: string[]
  configs?: UserConfigItem[]
}): Promise<UserConfigItem[]>

export { eslintConfig, eslintConfig as default }
