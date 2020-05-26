const urls = require('./urls')
const { devServer } = require('../zigzag.config')

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

module.exports = {
  compress: true, // gzip
  inline: true,
  noInfo: true,
  before(app, server) {
    server._watch(urls.dev.root + `**/*.ejs`)
  },
  after: () => {
    if (!devServer.useBroswerSync) {
      const protocol = devServer.isHttps ? 's' : ''
      console.info(
        `Project is running at http${protocol}://${devServer.ip}:${devServer.port}/...
        \npress Ctrl+c to quit`
      )
    }
  },
  overlay: {
    warnings: false,
    errors: true,
  },
  clientLogLevel: 'error',
  historyApiFallback: true,
  hot: devServer.hmr,
  https: devServer.isHttps,
  open: false,
  progress: false,
  port: devServer.port,
  useLocalIp: !devServer.useBroswerSync,
  host: '0.0.0.0',
}
