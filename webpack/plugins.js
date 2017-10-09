const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const threadPool = HappyPack.ThreadPool({ size : os.cpus().length });
const DEV_MODE = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined);

const plugins = [
  new LodashModuleReplacementPlugin({
    cloning     : true,
    collections : true,
    flattening  : true,
    paths       : true,
    shorthands  : true,
  }),
  new HappyPack({
    cacheContext : { env: process.env.NODE_ENV },
    id           : 'babel',
    loaders      : ['babel-loader?cacheDirectory'],
    threadPool,
  }),
  new webpack.LoaderOptionsPlugin({
    debug  : DEV_MODE,
    eslint : { configFile: path.resolve(__dirname, '..', '.eslintrc') },
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

const getPlugins = () => {
  if (DEV_MODE) {
    return plugins.concat(require('./dev/plugins')());
  }

  return plugins.concat(require('./prod/plugins')());
};

module.exports = getPlugins;
