const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const getPlugins = () => {
  const vendorManifest = path.resolve(__dirname, '..', '..', 'server/js/dll/vendor-manifest.json');

  if (fs.existsSync(vendorManifest)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        context  : '.',
        manifest : vendorManifest,
      }),
    );
  }

  return plugins;
};

module.exports = getPlugins;
