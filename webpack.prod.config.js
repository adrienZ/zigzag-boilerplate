var path = require('path');
var root = path.resolve(__dirname);
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  node: {
    __filename: true
  },
  watch: false,
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
        loader: "babel",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })]
}
