module.exports = function (config) {
  config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader'
    ]
  })

  config.resolve.extensions.push('.sass')
  config.resolve.extensions.push('.scss')

  return config
}
