export function clear () {
  localStorage.clear()
}

export function has (key) {
  return !!localStorage.getItem(key)
}

export function get (key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return null
  }
}

export function remove (key) {
  localStorage.removeItem(key)
}

export function set (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export default {
  clear,
  has,
  get,
  remove,
  set
}
