// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const ip = require("ip");

module.exports = {
  // contentBase: urls.APP_URL,
  // change this as you want
  compress: true, //gzip
  inline: true,
  watchContentBase: false, // enable reload on save for html
  noInfo: true,
  overlay: {
    warnings: false,
    errors: true
  },
  historyApiFallback: true,
  hot: true,
  https: false,
  open: false,
  progress: false,
  port: 1234,
  useLocalIp: true,
  host: ip.address(),
  quiet: false // shut down console,
};
