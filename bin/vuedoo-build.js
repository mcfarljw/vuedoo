const filesystem = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config-prod.js')

filesystem.emptyDirSync(path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, './dist'))

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
