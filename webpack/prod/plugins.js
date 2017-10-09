const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  }),
];

module.exports = () => plugins;
