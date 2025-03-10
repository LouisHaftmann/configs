import type antfu from '@antfu/eslint-config'

declare function eslintConfig(config: {
  nuxt?: boolean
  tsconfigPath?: string
}): ReturnType<typeof antfu>

export default eslintConfig
export { eslintConfig }
