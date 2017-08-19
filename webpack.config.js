const chalk = require('chalk')
const lodash = require('lodash')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const config = require('./lib/config.js')
const helpers = require('./lib/helpers.js')

let webpackConfig = {
  entry: {
    main: helpers.resolveProjectPath(config.client.entry)
  },

  output: {
    filename: '[name].js',
    path: helpers.resolveProjectPath(config.client.output),
    publicPath: config.client.base
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(gif|ico|jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: helpers.optimizeCommonChunks
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: helpers.resolveProjectPath(config.client.html)
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue('Building') + ' [:percent :bar]'
    })
  ],

  resolve: {
    alias: {
      '~': helpers.resolveProjectPath(),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.json', '.vue'],
    modules: [
      helpers.resolveLibraryPath('node_modules'),
      helpers.resolveProjectPath('node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      helpers.resolveLibraryPath('node_modules'),
      helpers.resolveProjectPath('node_modules')
    ]
  }
}

if (lodash.intersection(config.client.plugins, ['coffee']).length > 0) {
  webpackConfig = require('./lib/plugins/coffee.js')(webpackConfig)
}

if (lodash.intersection(config.client.plugins, ['css']).length > 0) {
  webpackConfig = require('./lib/plugins/css.js')(webpackConfig)
}

if (lodash.intersection(config.client.plugins, ['less']).length > 0) {
  webpackConfig = require('./lib/plugins/less.js')(webpackConfig)
}

if (lodash.intersection(config.client.plugins, ['jade', 'pug']).length > 0) {
  webpackConfig = require('./lib/plugins/pug.js')(webpackConfig)
}

if (lodash.intersection(config.client.plugins, ['sass', 'scss']).length > 0) {
  webpackConfig = require('./lib/plugins/sass.js')(webpackConfig)
}

if (lodash.intersection(config.client.plugins, ['styl', 'stylus']).length > 0) {
  webpackConfig = require('./lib/plugins/stylus.js')(webpackConfig)
}

module.exports = webpackConfig
