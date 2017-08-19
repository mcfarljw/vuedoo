module.exports = function (config) {
  config.module.rules.push({
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
  })

  return config
}

