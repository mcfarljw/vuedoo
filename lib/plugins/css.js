module.exports = function (config) {
  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  })

  config.resolve.extensions.push('.css')

  return config
}
