// TODO: timestamp to bundle.js?
module.exports = [
  require('./make-webpack-config')({
    env: process.env.NODE_ENV,
    entryItems: [],
    loaderType: 'babel',
    outputFilename: 'bundle.js',
    minimize: true
  })
];
