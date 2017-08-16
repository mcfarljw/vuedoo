module.exports = {
  client: {
    base: '/',
    entry: 'src/main.js',
    html: 'src/assets/index.pug',
    output: '.build'
  },
  server: {
    port: 5000
  }
}
