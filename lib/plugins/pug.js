const { merge } = require('lodash')

module.exports = function (config) {
  const rules = [
    {
      test: /\.pug$/,
      exclude: /node_modules/,
      loader: 'pug-loader'
    }
  ]

  merge(config.module.rules, rules)

  return config
}

