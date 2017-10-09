const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool : 'source-map',
  entry   : {
    vendor : [path.resolve(__dirname, '..', 'src', 'vendors.js')]
  },
  output : {
    filename : 'dll.[name].js',
    library  : '[name]',
    path     : path.resolve(__dirname, '..', 'server', 'js', 'dll'),
  },
  plugins : [
    new webpack.NamedModulesPlugin(),
    new webpack.DllPlugin({
      context : '.',
      name    : '[name]',
      path    : path.resolve(__dirname, '..', 'server', 'js', 'dll', '[name]-manifest.json'),
    }),
  ]
};
