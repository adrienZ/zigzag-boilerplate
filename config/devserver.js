// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const path = require('path');
const urls = require('./urls');
const ip = require('ip');

module.exports = {
	contentBase: path.join(urls.BASE_URL, 'dist'),
	// change this as you want
	compress: true, // enable gzip compression
	inline: false, // iframe mode,
  noInfo: true, // cut the fat
  overlay: true,
	historyApiFallback: false, // history API fallback.
	hot: false, // hot reload
	https: false, // open new tab
	open: false, // remove useless infos
  port: 1234,
  host:  ip.adress, //current ip, same url for multiple devices
  quiet: true, // shut down console
  overlay: true
}