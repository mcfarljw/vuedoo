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

module.exports = {
  optimizeCommonChunks
}
