#!/usr/bin/env node

const shell = require('shelljs')
const project = require('../package.json')

shell.rm('-rf', '.cordova')
shell.exec('cordova create .cordova ' + project.cordova.id + ' "Vuedoo"')
shell.cd('.cordova')

// platforms
shell.exec('cordova platform add android@6.3.0')
shell.exec('cordova platform add ios@4.5.1')

// plugins
shell.exec('cordova plugin add cordova-plugin-crosswalk-webview@2.3.0')
shell.exec('cordova plugin add cordova-plugin-device@1.1.6')
