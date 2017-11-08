const project = require('./package.json')

module.exports = {
  alias: {
    '~data': 'res/data'
  },
  html: [
    {filename: 'index.html', template: 'src/assets/index.pug'},
    {filename: 'cordova.html', template: 'src/assets/cordova.pug'}
  ],
  plugins: ['pug', 'stylus'],
  replace: [
    {search: '{!application-name!}', replace: project.name, flags: 'g'},
    {search: '{!application-version!}', replace: project.version, flags: 'g'}
  ],
  port: 1987,
  static: [
    {from: 'res/static', to: 'static'}
  ]
}
