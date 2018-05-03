module.exports = function (config) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'stylus-loader'
    ]
  })

  config.resolve.extensions.push('.styl')

  return config
}
