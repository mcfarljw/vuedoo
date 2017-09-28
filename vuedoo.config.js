const project = require('./package.json')

module.exports = {
  html: 'src/assets/index.pug',
  plugins: ['pug', 'sass'],
  replace: [
    {search: '{!application-name!}', replace: project.name, flags: 'g'},
    {search: '{!application-version!}', replace: project.version, flags: 'g'}
  ]
}
