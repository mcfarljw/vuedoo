const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const config = require('./lib/config')

module.exports = webpackMerge(webpackConfig, {
  devtool: config.sourcemap ? '#source-map' : false,
  mode: 'production',
  optimization: {
    minimize: true
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
