module.exports = function (config) {
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  })

  return config
}
