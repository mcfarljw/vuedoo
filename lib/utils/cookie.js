export function get (name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')

  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  } else {
    return null
  }
}

export function set (name, value, days) {
  let expires = ''

  if (days) {
    const date = new Date()

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  }

  document.cookie = name + '=' + value + expires + '; path=/'
}

export default {
  get,
  set
}
