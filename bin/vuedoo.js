#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))

process.env.VUEDOO_LIBRARY_DIRECTORY = process.mainModule.filename.replace('/bin/vuedoo.js', '')
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
