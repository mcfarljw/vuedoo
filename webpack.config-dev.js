const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const helpers = require('./lib/helpers')

Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[name] = [helpers.resolveLibraryPath('lib/reload')].concat(webpackConfig.entry[name])
})

module.exports = webpackMerge(webpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
