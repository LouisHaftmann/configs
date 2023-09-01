/** @type import('prettier').Config */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  htmlWhitespaceSensitivity: 'ignore',
  quoteProps: 'consistent',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
