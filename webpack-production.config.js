// TODO: timestamp to bundle.js?
module.exports = [
  require('./make-webpack-config')({
    entryItems: [],
    loaderType: 'babel',
    outputFilename: 'bundle.js',
    minimize: true
  })
];
