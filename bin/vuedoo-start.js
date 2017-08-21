#! /usr/bin/env node

const filesystem = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config-prod.js')
const config = require('../lib/config.js')
const helpers = require('../lib/helpers.js')
const server = require('../lib/server.js')

filesystem.emptyDirSync(helpers.resolveProjectPath(config.client.output))

webpack(webpackConfig, (error, result) => {
  if (error) throw error

  process.stdout.write(result.toString({
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    modules: false
  }))

  process.stdout.write('\n')

  server.start()
})
