/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: [
      // These pages are not used directly by users so they can have one-word names.
      '**/pages/**/*.{js,ts,jsx,tsx,vue}',
      '**/layouts/**/*.{js,ts,jsx,tsx,vue}',
      '**/app.{js,ts,jsx,tsx,vue}',
      '**/error.{js,ts,jsx,tsx,vue}',
      // These files should have multiple words in their names as they are within subdirectories.
      '**/components/*/**/*.{js,ts,jsx,tsx,vue}',
    ],
    rules: /** @type {const} */ ({ 'vue/multi-word-component-names': 'off' }),
  },
  {
    // Pages and layouts are required to have a single root element if transitions are enabled.
    files: ['**/pages/**/*.{js,ts,jsx,tsx,vue}', '**/layouts/**/*.{js,ts,jsx,tsx,vue}'],
    rules: /** @type {const} */ ({ 'vue/no-multiple-template-root': 'error' }),
  },
]
