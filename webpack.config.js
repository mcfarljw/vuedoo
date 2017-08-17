const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const config = require('./lib/config.js')
const helpers = require('./lib/helpers.js')

module.exports = {

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
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader'
          }
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
    extensions: ['.js', '.vue'],
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
