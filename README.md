# Vuedoo

The goal of the project is to encapsulate the boilerplate code required for creating modern javascript applications with Webpack.

## Usage

### package.json

```json
{
  "scripts": {
    "build": "vuedoo build",
    "lint": "vuedoo lint",
    "monitor": "vuedoo monitor",
    "start": "vuedoo"
  },
  "dependencies": {
    "vue": "2.x",
    "vuedoo": "latest"
  }
}
```

### vuedoo.config.js

```javascript
module.export = {
  alias: {},
  base: '/',
  entry: 'src/main.js',
  html: [
    {filename: 'index.html', template: 'src/assets/index.html'}
  ],
  output: '.build',
  plugins: [],
  port: 5000,
  replace: [
    {search: '{!application-name!}', replace: 'Vuedoo', flags: 'g'},
    {search: '{!application-version!}', replace: '1.0.0', flags: 'g'}
  ]
}
```
