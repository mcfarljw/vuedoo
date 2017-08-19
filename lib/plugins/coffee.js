module.exports = function (config) {
  config.module.rules.push({
    test: /\.coffee$/,
    loader: 'coffee-loader'
  })

  config.resolve.extensions.push('.coffee')

  return config
}

