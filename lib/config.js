const { merge } = require('lodash')
const { resolveProjectPath } = require('./helpers.js')

const baseConfig = {
  alias: {},
  base: '/',
  entry: 'src/main.js',
  html: 'src/assets/index.html',
  output: '.build',
  plugins: [],
  port: 5000,
  replace: []
}

try {
  module.exports = merge({}, baseConfig, require(resolveProjectPath('vuedoo.config.js')))
} catch (error) {
  module.exports = merge({}, baseConfig)
}
