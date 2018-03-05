const { merge } = require('lodash')
const { normalizeDefineData, resolveProjectPath } = require('./helpers')
let config

const baseConfig = {
  alias: {},
  base: '/',
  define: null,
  cordova: false,
  entry: 'src/main.js',
  html: [
    {filename: 'index.html', template: 'src/assets/index.html'}
  ],
  output: 'dist',
  plugins: [],
  port: 5000,
  replace: [],
  sourcemap: false,
  static: []
}

try {
  config = merge({}, baseConfig, require(resolveProjectPath('vuedoo.config.js')))
} catch (error) {
  config = merge({}, baseConfig)
}

if (process.env.CORDOVA) {
  config.cordova = process.env.CORDOVA
}

if (process.env.PORT) {
  config.port = process.env.PORT
}

if (config.define) {
  config.define = normalizeDefineData(config.define)
}

module.exports = config
