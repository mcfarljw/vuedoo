
const compression = require('compression')
const connectHistoryApiFallback = require('connect-history-api-fallback')
const express = require('express')
const helmet = require('helmet')
const httpProxyMiddleware = require('http-proxy-middleware')
const lodash = require('lodash')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config =  require(process.env.VUEDOO_PROJECT_DIRECTORY + '/vuedoo.config.js')
const webpackConfig = require('../webpack.config-dev.js')

const compiler = webpack(webpackConfig)
const history = connectHistoryApiFallback()

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.client.base,
  quiet: true
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
        new Promise(resolve => this._instance.listen(config.server.port || 5000, resolve))
      ])
    }

    this._instance.use(express.static(path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, './dist')))

    this._instance.get('*', (req, res) => {
      res.sendFile('index.html', {root: path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, './dist')})
    })

    return new Promise(resolve => this._instance.listen(config.server.port || 5000, resolve))
  },
  stop: function () {
    return new Promise(resolve => {
      this._instance.on('close', resolve)
      this._instance.close()
    })
  }
}
