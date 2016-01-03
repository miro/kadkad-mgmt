var webpack = require('webpack');

module.exports = require('./make-webpack-config')({
  entryItems: [
    'webpack-dev-server/client?http://localhost:9010',
    'webpack/hot/only-dev-server',
  ],

  loaderType: 'react-hot!babel',
  outputFilename: 'bundle.js',
  useDevServer: true,
  sourcemaps: true
});
