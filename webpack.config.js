var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var config = {
  entry: ['./app/main.js', hotMiddlewareScript, './karma-bundle.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./app/public/scripts/'),
    publicPath: publicPath
  },
  devtool: 'source-map',
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
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
