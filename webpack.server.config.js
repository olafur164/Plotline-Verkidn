const fs = require('fs');
const path = require('path');

function createNodeModulesExternals() {
  const nodeModules = {};

  fs.readdirSync(path.join(__dirname, 'node_modules'))
    .filter(name => !name.startsWith('.'))
    .forEach(mod => {
      nodeModules[mod] = `commonjs ${mod}`;
    });

  return nodeModules;
}

module.exports = {
  target: 'node',
  devtool: 'source-map',
  externals: createNodeModulesExternals(),
  entry: path.join(__dirname, 'src', 'server', 'index.js'),

  output: {
    path: path.join(__dirname, 'dist', 'server'),
    filename: 'server.js',
  },

  module: {
    loaders: [
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

};
