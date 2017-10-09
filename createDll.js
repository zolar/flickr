const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const config = require('./webpack/dll');

module.exports = () => {
  const vendorManifest = path.resolve(__dirname, 'server', 'js', 'dll', 'vendor-manifest.json');
  const vendorsFile = path.resolve(__dirname, 'src', 'app', 'vendors.js');
  const pkg = path.resolve(__dirname, 'package.json');
  if (!fs.existsSync(vendorManifest)
    || !fs.existsSync(vendorsFile)
    || fs.statSync(vendorsFile).mtime > fs.statSync(vendorManifest)
    || fs.statSync(pkg) > fs.statSync(vendorManifest)) {
    return new Promise(resolve => {
      const compiler = webpack(config);
      compiler.run((err, stats) => {
        resolve();
        console.log(stats.toString({colors: true}));
      });
    });
  }

  return Promise.resolve();
};
