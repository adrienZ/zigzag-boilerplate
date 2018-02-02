// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const path = require("path");
const urls = require("./urls");
const env = require("./env");
const ip = require("ip");

module.exports = {
  contentBase: path.join(urls.BASE_URL, "dist"),
  // change this as you want
  compress: true,
  inline: true,
  noInfo: true,
  overlay: {
    warnings: false,
    errors: true
  },
  historyApiFallback: true,
  hot: true,
  https: false,
  open: true,
  progress: false,
  port: 1234,
  host: ip.address(),
  quiet: false // shut down console,
};
