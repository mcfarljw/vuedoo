export function isCordova () {
  return window.cordova !== undefined
}

export function isLocalhost () {
  return window.location.hostname === 'localhost'
}

export default {
  isCordova,
  isLocalhost
}
