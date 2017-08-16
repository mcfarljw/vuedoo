require('eventsource-polyfill')

require('webpack-hot-middleware/client?noInfo=true&reload=true').subscribe(event => {
  if (event.action === 'reload') window.location.reload()
})
