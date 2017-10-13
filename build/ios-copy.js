#!/usr/bin/env node

const shell = require('shelljs')
const project = require('../package.json')

process.env.CORDOVA = true

shell.rm('-rf', '.cordova/www/*')
shell.cp('-r', '.build/*', '.cordova/www')

shell.cp('res/config.xml', '.cordova/config.xml')
shell.sed('-i', '{!cordova-author!}', project.author, '.cordova/config.xml')
shell.sed('-i', '{!cordova-description!}', project.description, '.cordova/config.xml')
shell.sed('-i', '{!cordova-id!}', project.cordova.id, '.cordova/config.xml')
shell.sed('-i', '{!cordova-name!}', 'Vuedoo', '.cordova/config.xml')
shell.sed('-i', '{!cordova-version!}', project.version, '.cordova/config.xml')
