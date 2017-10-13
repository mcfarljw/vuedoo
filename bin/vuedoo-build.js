#! /usr/bin/env node

const filesystem = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config-prod')
const config = require('../lib/config')
const helpers = require('../lib/helpers')

filesystem.emptyDirSync(helpers.resolveProjectPath(config.output))

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
})
