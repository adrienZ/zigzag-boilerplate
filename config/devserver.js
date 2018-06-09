const ip = require('ip')
const env = require('./env')

/*
// =======================================================================//
//                                                                        //
// !  DEV SERVER CONFIG                                                   //
//                                                                        //
// *  native webpack-dev-server options with some env variables           //
// *  .ejs files in subfolders can still be use without getting complied  //
// *  url related option can be set in the .env file                      //
//                                                                        //
// ?  https://webpack.js.org/configuration/dev-server/                    //
//                                                                        //
// =======================================================================//
*/

const serverIp = ip.address()
const serverPort = env.DEV_SERVER_PORT
const serverHttps = env.DEV_SERVER_HTTPS === 'true'
const serverUseLocalIp = env.DEV_SERVER_LOCAL_IP === 'true'
const serverHost = serverUseLocalIp ? serverIp : null

module.exports = {
  // i will never know how to use this ⬇️
  // contentBase: urls.dev.root,
  compress: true, // gzip
  inline: true,
  noInfo: true,
  before: () => {
    const s = serverHttps ? 's' : ''
    console.info(
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
  hot: env.DEV_SERVER_HMR === 'true',
  https: serverHttps,
  open: false,
  progress: false,
  port: serverPort,
  useLocalIp: serverUseLocalIp,
  host: serverHost,
  quiet: false, // shut down console,
}
