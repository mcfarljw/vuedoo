const { defaultTo, includes, isArray, merge, forOwn } = require('lodash')
const path = require('path')

function contains (search, value) {
  search = isArray(search) ? search : [search]

  for (let i = 0, length = search.length; i < length; i++) {
    if (includes(value, search[i])) return true
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

function mergeAlias (alias1, alias2) {
  return merge(resolveAlias(alias2), alias1)
}

function resolveAlias (alias) {
  return forOwn(alias, (value, key) => {
    alias[key] = resolveProjectPath(value)
  })
}

function resolveLibraryPath (value) {
  return path.resolve(process.env.VUEDOO_LIBRARY_DIRECTORY, defaultTo(value, ''))
}

function resolveProjectPath (value) {
  return path.resolve(process.env.VUEDOO_PROJECT_DIRECTORY, defaultTo(value, ''))
}

module.exports = {
  mergeAlias,
  optimizeCommonChunks,
  resolveLibraryPath,
  resolveProjectPath
}
