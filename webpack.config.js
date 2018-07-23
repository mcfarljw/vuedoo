const chalk = require('chalk')
const lodash = require('lodash')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./lib/config.js')
const helpers = require('./lib/helpers.js')

let webpackConfig = {
  entry: {
    main: ['babel-polyfill', helpers.resolveProjectPath(config.entry)]
  },

  output: {
    filename: '[name].js',
    path: helpers.resolveProjectPath(config.output),
    publicPath: config.cordova ? '' : config.base
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'vue-app']
        }
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
        test: /\.js$/,
        include: /workers/,
        loader: 'worker-loader'
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
      },
      {
        test: [/\.(frag|vert?)$/],
        loader: 'raw-loader'
      }
    ]
  },

  performance: {
    hints: false
  },

  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(lodash.map(config.static, entry => {
      if (entry.from) entry.from = helpers.resolveProjectPath(entry.from)

      return entry
    })),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['URL: http://localhost:' + config.port]
      }
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue('Building') + ' [:percent :bar]',
      summary: false
    })
  ],

  resolve: {
    alias: helpers.mergeAlias({
      '~': helpers.resolveProjectPath(),
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
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: entry.filename,
      template: helpers.resolveProjectPath(entry.template)
    })
  )
})

if (config.define) {
  webpackConfig.plugins.push(new webpack.DefinePlugin(config.define))
}

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
