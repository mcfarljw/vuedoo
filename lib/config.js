const { assign } = require('lodash')
const { resolveLibraryPath, resolveProjectPath } = require('./helpers.js')

const baseConfig = {
  client: {
    base: '/',
    entry: 'src/main.js',
    html: 'src/assets/index.html',
    output: '.build',
    plugins: []
  },
  server: {
    port: 5000
  }
}

try {
  module.exports = assign({}, baseConfig, require(resolveProjectPath('vuedoo.config.js')))
} catch (error) {
  module.exports = assign({}, baseConfig)
}


