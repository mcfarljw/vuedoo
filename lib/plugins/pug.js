module.exports = function (config) {
  config.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-loader'
  })

  return config
}

