const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const path = require('path')

const env = require('./env')
const config = require('./config')
const entries = require('./entries')
const urls = require('./urls')
// const pwa = require('./pwa')
const devServer = require('./devserver')

/*
// =======================================================================//
//                                                                        //
// !  ✅ CSS OUTPUT PLUGIN                                                //
//                                                                        //
// *  Transform .scss into .css and add hash if prod                      //
//                                                                        //
// ?  https://github.com/webpack-contrib/mini-css-extract-plugin          //
//                                                                        //
// =======================================================================//
*/

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const sassPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: env.serverMode ? '[name].css' : '[name].[contenthash].css',
  chunkFilename: env.devMode ? '[id].css' : '[id].[contenthash].css',
})

/*
// =======================================================================//
//                                                                        //
// !  ✅ HTML OUTPUT PLUGIN                                               //
//                                                                        //
// *  Turn ejs into html and inject some node variables                   //
//                                                                        //
// ?  https://github.com/jantimon/html-webpack-plugin                     //
//                                                                        //
// =======================================================================//
*/

const views = entries.views()
const htmlExport = views.map(
  view =>
    new HtmlWebpackPlugin({
      title: config.APP_TITLE,
      description: config.APP_DESCRIPTION,
      template: urls.dev.root + view,
      filename: view.replace('.ejs', '.html'),
      inject: 'body',
      showErrors: env.devMode ? true : false,
      excludeChunks: Object.keys(entries.imgs),
      minify: {
        removeComments: true,
        removeRedundantAttributes: true,
      },
    })
)

/*
// =======================================================================//
//                                                                        //
// !  🤖 WEBPACK NOTIFIER  (OPTIONAL)                                      //
//                                                                        //
// *  improve developer workflow, but add terminal response time          //
// *  while the popup is visible  (promise resolving)                     //
//                                                                        //
// ?  https://github.com/Turbo87/webpack-notifier                         //
//                                                                        //
// =======================================================================//
*/

const webpackNotifier = new WebpackBuildNotifierPlugin({
  title: env.appTitle,
  logo: path.resolve(urls.dev.root, 'favicon.png'),
  suppressSuccess: true,
  sound: false,
})

/*
  DEFAULT PLUGINS: CSS, NOTIFICATION, HTML AND PWA (service worker + manifest)
*/

const PLUGINS_CONFIG = [sassPlugin, webpackNotifier, ...htmlExport]

/*
// =======================================================================//
//                                                                        //
// !  🤖 HOT MODULE RELOADING  (OPTIONAL)                                 //
//                                                                        //
// *  refresh ressources on filechange                                    //
//                                                                        //
// ?  https://webpack.js.org/concepts/hot-module-replacement/             //
//                                                                        //
// =======================================================================//
*/

if (env.serverMode) {
  devServer.hot && PLUGINS_CONFIG.push(new webpack.HotModuleReplacementPlugin())
}

if (!env.serverMode) {
  /*
  // =======================================================================//
  //                                                                        //
  // !  🤖 HARDSROUCE EMITTED FILES                                         //
  //                                                                        //
  // *  complex webpack configs like this one tend to compile slowly        //
  // *  so we use cache.                                                    //
  // * the cache is store in the dependecie folder, we could change this    //
  //                                                                        //
  // ?  https://github.com/mzgoddard/hard-source-webpack-plugin             //
  //                                                                        //
  // =======================================================================//
  */

  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  PLUGINS_CONFIG.push(new HardSourceWebpackPlugin())

  /*
  // =======================================================================//
  //                                                                        //
  // !  🤖 WEBPACK MANIFEST PLUGIN                                          //
  //                                                                        //
  // *  write json file containing all webpack chunks output                //
  // *  very usefull for backend                                            //
  //                                                                        //
  // ?  https://github.com/danethurber/webpack-manifest-plugin              //
  //                                                                        //
  // =======================================================================//
  */

  PLUGINS_CONFIG.push(
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    })
  )

  if (!env.devMode) {
    /*
    // =======================================================================//
    //                                                                        //
    // !  🤖 CLEAR DIST PLUGIN                                                //
    //                                                                        //
    // *  does what it say                                                    //
    // *  usefull for production deploy and clean files with expired hash     //
    //                                                                        //
    // ?  https://github.com/johnagan/clean-webpack-plugin                    //
    //                                                                        //
    // =======================================================================//
    */

    const relativeDist = path.relative(urls.BASE_URL, urls.prod.root) + '/'
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    PLUGINS_CONFIG.push(
      new CleanWebpackPlugin([relativeDist], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
      })
    )

    /*
      🙈 SOME WEBPACK OPTIMIZATION
      https://github.com/webpack/docs/wiki/optimization
    */

    PLUGINS_CONFIG.push(new webpack.optimize.OccurrenceOrderPlugin())
    PLUGINS_CONFIG.push(new webpack.optimize.ModuleConcatenationPlugin())
    PLUGINS_CONFIG.push(
      new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
    )

    /*
    // =======================================================================//
    //    🚧 WORK IN PROGRESS !!!                                             //
    // !  🤖 COMPRESSION PLUGIN                                               //
    //                                                                        //
    // *  gzip ressources                                                     //
    // *  combined with a htaccess it will radically improve perfomance       //
    //                                                                        //
    // ?  https://webpack.js.org/plugins/compression-webpack-plugin/          //
    //                                                                        //
    // =======================================================================//
    */

    // const CompressionPlugin = require('compression-webpack-plugin')
    // PLUGINS_CONFIG.push(
    //   new CompressionPlugin({
    //     test: /\.(js|.scss|jpg|png|jpeg|gif|tiff|cr2|svg|mp4|avi|ogg|webm|json|woff|woff2|eot|ttf|obj)$/i,
    //     deleteOriginalAssets: true,
    //     cache: true,
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //   })
    // )
  }
}

module.exports = PLUGINS_CONFIG
