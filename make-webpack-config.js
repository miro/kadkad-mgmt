var webpack = require('webpack');

// NOTE: this file is super derpy derpy; do not copy if you want something proper

module.exports = function(options) {
  // entry file
  var entry = [];
  entry = entry.concat(options.entryItems).concat(['./src/index.jsx']);

  var basicLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: options.loaderType
  };

  var output = {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: options.outputFilename
  };

  var plugins = [];

  if (options.useDevServer) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    );

    plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    module: {
      loaders: [basicLoader]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: output,
    plugins: plugins,

    devServer: (options.useDevServer) ? {
      contentBase: './dist',
      hot: true
    } : {},

    devtool: (options.sourcemaps) ? 'cheap-module-eval-source-map' : '',
  };
};
