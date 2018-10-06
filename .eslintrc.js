/**
 * eslint 配置
 * @author Philip
 */
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['node'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'quotes': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 'off',
  },
  globals: {
    Objects: true,
    assert: true,
    it: true,
    describe: true,
  },
}
