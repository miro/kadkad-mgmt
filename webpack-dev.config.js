var webpack = require('webpack');

module.exports = require('./make-webpack-config')({
  entryItems: [
    'webpack-dev-server/client?http://localhost:9010',
    'webpack/hot/only-dev-server',
  ],

  env: 'development', // config file will be loaded based on this

  loaderType: 'react-hot!babel',
  outputFilename: 'bundle.js',
  useDevServer: true,
  sourcemaps: true
});
