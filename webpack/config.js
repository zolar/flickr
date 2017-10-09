const os = require('os');
const fs = require('fs');
const path = require('path');

// get NODE ENV and set  the DEVMODE
const DEV_MODE = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined);

module.exports = {
  entry  : require('./entry')(),
  output : {
    path       : path.join(__dirname, '..', 'server', 'js'),
    filename   : 'app.js',
    publicPath : '/js/'
  },
  devtool : DEV_MODE ? 'eval': 'source-map',
  module  : {
    rules : [
      {
        test    : /\.js$/,
        use     : [{ loader: 'happypack/loader?id=babel' }],
        exclude : [/node_modules/, /server/]
      },
      {
        test : /\.json$/,
        use  : [{ loader: 'json-loader' }],
      }
    ]
  },
  resolve       : { extensions: ['.es6.js', '.js', '.jsx', '.json'] },
  resolveLoader : {
    alias   : {
      css   : 'css-loader',
      style : 'style-loader',
    },
  },
  plugins : require('./plugins')(),
  cache   : true,
};
