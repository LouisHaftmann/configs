/** @param {string} [runInPackage] */
export default (runInPackage) => {
  const pnpmExec = runInPackage ? `pnpm --filter ${runInPackage} exec ` : ''

  return {
    '*.{vue,?([cm])[jt]s?(x),y?(a)ml,json?(c),md,html,?(s)css}': [
      `${pnpmExec}eslint --fix --cache`,
      `${pnpmExec}prettier --write --cache`,
    ],
    '*.{vue,?([cm])ts?(x)}': () => `${pnpmExec}vue-tsc -p tsconfig.json --noEmit --composite false`, // run once for all files
  }
}
