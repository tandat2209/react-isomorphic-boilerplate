var yargs = require('yargs');

const argv = yargs.alias('p', 'production').argv;

process.env.NODE_ENV = argv.production ? 'production' : 'development';
  // Babel polyfill to convert ES6 code in runtime
require('babel-register')({
  "plugins": [
    [
      // plugin-webpack-loaders to replace `require, import` with webpack loader result
      "babel-plugin-webpack-loaders",
      {
        "config": "./webpack.config.babel.js",
        "verbose": false
      }
    ]
  ]
});
require('babel-polyfill');

// server/index.js will able to compile ES6
require('./server/index');
