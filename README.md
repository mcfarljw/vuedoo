# Vuedoo

The goal of the project is to completely encapsulate the basic boilerplate required for creating even basic Vue project when using Webpack.

## Quick Start

```
vue init mcfarljw/vuedoo-starter
```

## Usage

### package.json

```
{
  "scripts": {
    "build": "vuedoo build",
    "lint": "vuedoo lint",
    "monitor": "vuedoo monitor",
    "start": "vuedoo"
  },
  "dependencies": {
    "vuedoo": "0.2.x"
  }
}
```

### vuedoo.config.js

```
module.export = {
  alias: {},
  base: '/',
  entry: 'src/main.js',
  html: 'src/assets/index.html',
  output: '.build',
  plugins: [],
  port: 5000,
  replace: []
}
```
