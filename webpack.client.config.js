const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    filename: 'client.js',
  },
  module: {
    loaders: [
      {
         test: /\.css$/, 
         loader: "style-loader!css-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
