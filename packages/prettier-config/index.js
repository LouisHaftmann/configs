/* eslint-env node */

/** @type import('prettier').Config */
// eslint-disable-next-line import/no-commonjs
module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  htmlWhitespaceSensitivity: 'ignore',
  quoteProps: 'consistent',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
