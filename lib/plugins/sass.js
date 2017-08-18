const { find, merge } = require('lodash')

module.exports = function (config) {
  const rule = find(config.module.rules, {loader: 'vue-loader'})
  const options = {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader'
    }
  }

  merge(rule, { options })

  return config
}
