// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const ip = require('ip')
const env = require('./env')

const serverIp = ip.address()
const serverPort = env.DEV_SERVER_PORT
const serverHttps = env.DEV_SERVER_HTTPS === 'true'
const serverUseLocalIp = env.DEV_SERVER_LOCAL_IP === 'true'
const serverHost = serverUseLocalIp ? serverIp : null

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
        (serverHost || 'localhost') +
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
  port: serverPort,
  useLocalIp: serverUseLocalIp,
  host: serverHost,
  quiet: false, // shut down console,
}
