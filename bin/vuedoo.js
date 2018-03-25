#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const path = require('path')

process.env.VUEDOO_LIBRARY_DIRECTORY = path.resolve(process.mainModule.filename, '../../')
process.env.VUEDOO_PROJECT_DIRECTORY = process.cwd()

switch (argv._[0]) {
  case 'build':
    require('./vuedoo-build')
    break
  case 'monitor':
    require('./vuedoo-monitor')
    break
  default:
    require('./vuedoo-start')
    break
}
