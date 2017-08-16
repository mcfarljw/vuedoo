const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')

module.exports = webpackMerge(webpackConfig, {
  devtool: '#source-map',
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
})
