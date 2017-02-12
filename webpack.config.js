var path = require('path');
var root = path.resolve(__dirname);
var webpack = require("webpack");

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});



const testFolder = './app/';
const fs = require('fs');
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});




module.exports = {
  name: 'main',
  context: __dirname,
  node: {
    __filename: true
  },
  entry: {
    // for multiples entries
    bundle: ["./app/src/js/main.js"],
    test: ["./app/src/js/test.js"]
  },
  output: {
    path: path.resolve(__dirname, "./app/dist/js"),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(nodes_modules|bower_components)/,
        include: root,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }

      }
    ]
  }
};
