const ip = require('ip')
const config = require('./config')
const urls = require('./urls')

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

const serverUseLocalIp = config.DEV_SERVER_LOCAL_IP === true
const server = {
  host: serverUseLocalIp ? ip.address() : 'localhost',
  port: config.DEV_SERVER_PORT,
  isHttps: config.DEV_SERVER_HTTPS === 'true',
  isLocalIP: serverUseLocalIp,
}

module.exports = {
  compress: true, // gzip
  inline: true,
  noInfo: true,
  before(app, server) {
    server._watch(urls.dev.root + `**/*.ejs`);
  },
  after: () => {
    const s = server.isHttps ? 's' : ''
    console.info(
      `Project is running at http${s}://${server.host}:${server.port}/ ...
       press Ctrl+c to quit`
    )
  },
  overlay: {
    warnings: false,
    errors: true,
  },
  clientLogLevel: 'error',
  historyApiFallback: true,
  hot: config.DEV_SERVER_HMR,
  https: server.isHttps,
  open: false,
  progress: false,
  port: server.port,
  useLocalIp: serverUseLocalIp,
  host: '0.0.0.0',
}