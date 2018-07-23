const project = require('./package.json')

module.exports = {
  alias: {
    '~/data': 'res/data'
  },
  html: [
    {filename: 'index.html', template: 'res/index.pug'},
    {filename: 'cordova.html', template: 'res/cordova.pug'}
  ],
  plugins: ['pug', 'stylus'],
  replace: [
    {search: '{!application-name!}', replace: project.name, flags: 'g'},
    {search: '{!application-version!}', replace: project.version, flags: 'g'}
  ],
  port: 1987,
  static: [
    {from: 'res/images', to: 'images'}
  ]
}
