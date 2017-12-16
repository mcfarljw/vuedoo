const compression = require('compression')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const express = require('express')
const helmet = require('helmet')
const lodash = require('lodash')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config-dev')
const config = require('./config')
const helpers = require('./helpers')

const compiler = webpack(webpackConfig)
const history = connectHistoryApiFallback()

const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: 'silent',
  publicPath: config.base
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  heartbeat: 2000,
  log: function () {}
})

module.exports = {
  _instance: express(),
  start: function (options) {
    options = lodash.defaults(options, {dev: false})

    this._instance.use(compression())
    this._instance.use(helmet())

    if (options.dev) {
      this._instance.use(history)
      this._instance.use(devMiddleware)
      this._instance.use(hotMiddleware)

      return Promise.all([
        new Promise(resolve => devMiddleware.waitUntilValid(resolve)),
        new Promise(resolve => this._instance.listen(config.port, resolve))
      ])
    }

    this._instance.use(express.static(helpers.resolveProjectPath(config.output)))

    this._instance.get('*', (req, res) => {
      res.sendFile('index.html', {root: helpers.resolveProjectPath(config.output)})
    })

    return new Promise(resolve => this._instance.listen(config.port, resolve))
  },
  stop: function () {
    return new Promise(resolve => {
      this._instance.on('close', resolve)
      this._instance.close()
    })
  }
}
