const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const config = require('./lib/config')

module.exports = webpackMerge(webpackConfig, {
  devtool: config.sourcemap ? '#source-map' : false,
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: config.sourcemap || false
      })
    ]
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
