#! /usr/bin/env node
const lodash = require('lodash')
const argv = require('minimist')(process.argv.slice(2))

process.env.VUEDOO_ROOT_DIRECTORY = process.mainModule.filename.replace('/bin/vuedoo.js', '')
process.env.VUEDOO_PROJECT_DIRECTORY = process.cwd()

switch (argv._[0]) {
  case 'build':
    require('./vuedoo-build.js')
    break;
  case 'monitor':
    require('./vuedoo-monitor.js')
    break;
  default:
    require('./vuedoo-start.js')
    break;
}
