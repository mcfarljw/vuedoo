module.exports = function (config) {
  config.module.rules.push({
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ['pug-plain-loader']
      },
      {
        use: 'pug-loader'
      }
    ]
  })

  config.resolve.extensions.push('.pug')

  return config
}
