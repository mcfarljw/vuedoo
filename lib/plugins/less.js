module.exports = function (config) {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'less-loader'
    ]
  })

  config.resolve.extensions.push('.less')

  return config
}
