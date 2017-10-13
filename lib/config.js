const { merge } = require('lodash')
const { resolveProjectPath } = require('./helpers.js')
let config

const baseConfig = {
  alias: {},
  base: '/',
  entry: 'src/main.js',
  html: [
    {filename: 'index.html', template: 'src/assets/index.html'}
  ],
  output: '.build',
  plugins: [],
  port: 5000,
  replace: []
}

try {
  config = merge({}, baseConfig, require(resolveProjectPath('vuedoo.config.js')))
} catch (error) {
  config = merge({}, baseConfig)
}

if (process.env.PORT) {
  config.port = process.env.PORT
}

module.exports = config
