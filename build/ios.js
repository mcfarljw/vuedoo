#!/usr/bin/env node

const shell = require('shelljs')

process.env.CORDOVA = true

shell.exec('npm run build')
shell.exec('npm run ios:copy')

shell.cd('.cordova')
shell.exec('cordova run ios --emulator')
