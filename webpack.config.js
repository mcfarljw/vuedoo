const chalk = require('chalk')
const lodash = require('lodash')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
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
    publicPath: config.cordova ? '' : config.base
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
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
    new CopyWebpackPlugin(lodash.map(config.static, entry => {
      if (entry.from) entry.from = helpers.resolveProjectPath(entry.from)

      return entry
    })),
    new ProgressBarWebpackPlugin({
      format: chalk.blue('Building') + ' [:percent :bar]',
      summary: false
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['URL: http://localhost:' + config.port]
      }
    })
  ],

  resolve: {
    alias: helpers.mergeAlias({
      '~': helpers.resolveProjectPath(),
      'vuedoo/utils': helpers.resolveLibraryPath('lib/utils'),
      'vue$': 'vue/dist/vue.esm.js'
    }, config.alias),
    extensions: ['.css', '.js', '.json', '.vue'],
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

lodash.forEach(config.html, entry => {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: entry.filename,
    template: helpers.resolveProjectPath(entry.template)
  }))
})

if (lodash.intersection(config.plugins, ['coffee']).length > 0) {
  webpackConfig = require('./lib/plugins/coffee.js')(webpackConfig)
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
