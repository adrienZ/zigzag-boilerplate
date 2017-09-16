// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const path = require('path');
const urls = require('./urls');
const ip = require('ip');

module.exports = {
	contentBase: path.join(urls.BASE_URL, 'app'),
	// change this as you want
	compress: true,
	inline: true,
  noInfo: true,
  overlay: {
    warnings: false,
    errors: true
  },
  historyApiFallback: false,
  hot: false,
	https: false,
  open: false,
  progress: false,
  port: 1234,
  // host:  ip.address(), //current ip, same url for multiple devices
  quiet: false, // shut down console
}