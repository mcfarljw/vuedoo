const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const config =  require(process.env.VUEDOO_PROJECT_DIRECTORY + '/vuedoo.config.js')
const helpers = require('./src/helpers.js')

module.exports = {

  entry: {
    main: [path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, config.client.entry)]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, config.client.output),
    publicPath: config.client.base
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-vue-app')]
        }
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
      }
    ]
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
      template: path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, config.client.html)
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue('Building') + ' [:percent :bar]'
    })
  ],

  resolve: {
    alias: {
      '~': path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue'],
    modules: [
      path.resolve(process.env.VUEDOO_ROOT_DIRECTORY, './node_modules'),
      path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, './node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      path.resolve(process.env.VUEDOO_ROOT_DIRECTORY, './node_modules'),
      path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, './node_modules')
    ]
  }

}
