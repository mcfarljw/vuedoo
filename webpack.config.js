const chalk = require('chalk')
const lodash = require('lodash')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const config = require('./lib/config.js')
const helpers = require('./lib/helpers.js')

let webpackConfig = {
  entry: {
    main: helpers.resolveProjectPath(config.entry)
  },

  output: {
    filename: '[name].js',
    path: helpers.resolveProjectPath(config.output),
    publicPath: config.base
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        query: {
          multiple: config.replace
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(mp3|ogg|webm)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: 'audio/[name].[hash:7].[ext]'
        }
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
      template: helpers.resolveProjectPath(config.html)
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue('Building') + ' [:percent :bar]'
    })
  ],

  resolve: {
    alias: helpers.mergeAlias({
      '~': helpers.resolveProjectPath(),
      'vue$': 'vue/dist/vue.esm.js'
    }, config.alias),
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

if (lodash.intersection(config.plugins, ['coffee']).length > 0) {
  webpackConfig = require('./lib/plugins/coffee.js')(webpackConfig)
}

if (lodash.intersection(config.plugins, ['css']).length > 0) {
  webpackConfig = require('./lib/plugins/css.js')(webpackConfig)
}

if (lodash.intersection(config.plugins, ['less']).length > 0) {
  webpackConfig = require('./lib/plugins/less.js')(webpackConfig)
}

if (lodash.intersection(config.plugins, ['jade', 'pug']).length > 0) {
  webpackConfig = require('./lib/plugins/pug.js')(webpackConfig)
}

if (lodash.intersection(config.plugins, ['sass', 'scss']).length > 0) {
  webpackConfig = require('./lib/plugins/sass.js')(webpackConfig)
}

if (lodash.intersection(config.plugins, ['styl', 'stylus']).length > 0) {
  webpackConfig = require('./lib/plugins/stylus.js')(webpackConfig)
}

module.exports = webpackConfig
