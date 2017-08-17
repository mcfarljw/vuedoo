const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')
const helpers = require('./lib/helpers.js')

Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[name] = [helpers.resolveLibraryPath('lib/reload.js')].concat(webpackConfig.entry[name])
})

module.exports = webpackMerge(webpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
