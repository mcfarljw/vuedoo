const { assign } = require('lodash')

const baseConfig = {
  client: {
    base: '/',
    entry: 'src/main.js',
    html: 'src/assets/index.pug',
    output: '.build'
  },
  server: {
    port: 5000
  }
}

try {
  module.exports = assign({}, baseConfig, require(process.env.VUEDOO_PROJECT_DIRECTORY + '/vuedoo.config.js'))
} catch (error) {
  module.exports = assign({}, baseConfig)
}


