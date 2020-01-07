/**
 * eslint 配置
 * @author Philip
 */
module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: "standard",
  // required to lint *.vue files
  plugins: ["node"],
  // add your custom rules here
  rules: {
    // allow async-await
    "indent": ["error", 4],
    "generator-star-spacing": "off",
    "quotes": "off",
    "no-trailing-spaces": "off",
    "no-unused-vars": "off",
    "no-return-await": "off"
  },
  globals: {
    Objects: true,
    assert: true,
    it: true,
    describe: true,
  },
}
