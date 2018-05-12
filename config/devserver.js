// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const ip = require('ip')
// const urls = require('./urls')
const serverIp = ip.address()
const serverPort = 8899
const serverHttps = true
module.exports = {
  // contentBase: urls.dev.root,
  // change this as you want
  compress: true, //gzip
  inline: true,
  noInfo: true,
  before: () => {
    const s = serverHttps ? 's' : ''
    console.log(
      'Project is running at http' +
        s +
        '://' +
        serverIp +
        ':' +
        serverPort +
        '/'
    )
  },
  overlay: {
    warnings: false,
    errors: true,
  },
  clientLogLevel: 'error',
  historyApiFallback: true,
  hot: true,
  https: serverHttps,
  open: false,
  progress: false,
  port: 8899,
  useLocalIp: true,
  host: serverIp,
  quiet: false, // shut down console,
}
