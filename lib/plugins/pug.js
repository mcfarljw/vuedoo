module.exports = function (config) {
  config.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-loader'
  })

  config.resolve.extensions.push('.pug')

  return config
}

