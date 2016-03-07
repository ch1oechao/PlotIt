var path = require('path');
var config = {
  entry: path.resolve(__dirname, './components/app.js'),
  output: {
    path: path.resolve(__dirname, './public/scripts/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel']
    }, {
      test: /\.scss?$/,
      loader: 'style!css!sass'
    }, {
      test: /\.css?$/,
      loader: 'style!css'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    }]
  }
};

module.exports = config;
