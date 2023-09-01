export default {
  '*.{vue,?([cm])[jt]s?(x),y?(a)ml,json?(c),md,html,?(s)css}': [
    'eslint --fix --cache',
    'prettier --write --cache',
  ],
  '*.{vue,?([cm])ts?(x)}': () => 'vue-tsc -p tsconfig.json --noEmit --composite false', // run once for all files
}
