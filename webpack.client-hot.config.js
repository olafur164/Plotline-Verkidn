const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'client', 'index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'client.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
         test: /\.css$/, 
         loader: "style-loader!css-loader"
      },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
};
