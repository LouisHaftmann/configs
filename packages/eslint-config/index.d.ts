import antfu, { TypedFlatConfigItem } from '@antfu/eslint-config'

declare function eslintConfig(config: {
  nuxt: boolean
  tsconfigPath?: string[]
  /** @deprecated */ configs?: TypedFlatConfigItem[]
}): ReturnType<typeof antfu>

export { eslintConfig, eslintConfig as default }
