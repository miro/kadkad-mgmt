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



  // module: {
  //   loaders: [{
  //     test: /\.jsx?$/,
  //     exclude: /node_modules/,
  //     loader: 'react-hot!babel'
  //   }]
  // },
  // resolve: {
  //   extensions: ['', '.js', '.jsx']
  // },
  // output: {
  //   path: __dirname + '/dist',
  //   publicPath: '/',
  //   filename: 'bundle.js'
  // },
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  // devtool: 'cheap-module-eval-source-map',
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
});
