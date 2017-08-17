const lodash = require('lodash')
const path = require('path')

function contains (search, value) {
  search = Array.isArray(search) ? search : [search]

  for (let i = 0, length = search.length; i < length; i++) {
    if (value.indexOf(search[i]) > -1) return true
  }

  return false
}

function optimizeCommonChunks (module) {
  if (!module.resource) {
    return false
  }

  if (contains('node_modules', module.resource) && contains(['.css', '.js'], module.resource)) {
    return true
  }

  return false
}

function resolveLibraryPath (value) {
  return path.resolve(process.env.VUEDOO_LIBRARY_DIRECTORY, lodash.defaultTo(value, ''))
}

function resolveProjectPath (value) {
  return path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, lodash.defaultTo(value, ''))
}

module.exports = {
  optimizeCommonChunks,
  resolveLibraryPath,
  resolveProjectPath
}
