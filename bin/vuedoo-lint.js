#! /usr/bin/env node

const { resolveLibraryPath, resolveProjectPath } = require('../lib/helpers.js')
const lint = require('../lib/lint.js')

lint(resolveLibraryPath('bin/**/*.js'))
lint(resolveProjectPath('src/**/*.js'))
lint(resolveProjectPath('src/**/*.vue'), {plugins: ['vue']})
lint(resolveProjectPath('test/**/*.js'))
