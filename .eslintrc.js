module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    // add your custom globals here
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['html'],
  root: true,
  rules: {
    // add your custom rules here
  }
}
