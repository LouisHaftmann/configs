import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type antfu from '@antfu/eslint-config'

declare function eslintConfig(config: {
  nuxt: boolean
  tsconfigPath?: string[]
  /** @deprecated */ configs?: TypedFlatConfigItem[]
}): ReturnType<typeof antfu>

export { eslintConfig, eslintConfig as default }
