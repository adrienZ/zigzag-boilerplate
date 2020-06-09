const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')

const env = require('./env')
const entries = require('./entries')
const urls = require('./urls')
const { globals } = require('../zigzag.config')

/*
// =======================================================================//
//                                                                        //
// ? ✅ CSS OUTPUT PLUGIN                                                //
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
  filename: env.webpack_server
    ? urls.entriesFolder.css + '/[name].css'
    : urls.entriesFolder.css + '/[name].[contenthash].css',
  chunkFilename: env.development ? '[id].css' : '[id].[contenthash].css',
})

// Turn ejs into html and inject some node variables
const views = entries.views()
const htmlExport = views.map(
  view =>
    new HtmlWebpackPlugin({
      template: urls.dev.root + view,
      filename: view.replace('.ejs', '.html'),
      inject: 'body',
      showErrors: env.development,
      minify: {
        removeComments: true,
        removeRedundantAttributes: true,
      },
      templateParameters: globals,
    })
)

// improve developer workflow, but add terminal response time
const webpackNotifier = new WebpackBuildNotifierPlugin({
  title: path.basename(urls.BASE_URL),
  suppressSuccess: true,
  suppressWarning: true,
  activateTerminalOnError: true,
  sound: false,
})

// copy all assets, (uselless if you use a backend)
const assetsInclusion = new CopyPlugin([
  {
    from: urls.dev.assets,
    // waiting for webpack 5 asset type... hashes assets
    // to: env.development ? './assets/img/[name].[ext]' : './assets/[name].[hash].[ext]',
    // toType: 'template',
    to: './assets',
    ignore: ['.DS_Store', '.gitkeep'],
  },
])

// DEFAULT PLUGINS:
const PLUGINS_CONFIG = [
  sassPlugin,
  webpackNotifier,
  ...htmlExport,
  assetsInclusion,
  new VueLoaderPlugin(),
]

const { devServer } = require('../zigzag.config')
if (env.webpack_server && devServer.useBroswerSync) {
  const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  const protocol = devServer.isHttps ? 's' : ''

  PLUGINS_CONFIG.push(
    new BrowserSyncPlugin(
      {
        host: devServer.host,
        port: devServer.port,
        // proxy the Webpack Dev Server endpoint
        proxy: `http${protocol}://${devServer.ip}:${devServer.port}/`,
        open: false,
        // prevent hard reload when using HMR
        codeSync: false,
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    )
  )
}

if (!env.webpack_server) {
  // pretty build progress bar in the CLI
  const WebpackBar = require('webpackbar')
  PLUGINS_CONFIG.push(new WebpackBar())

  // cache emitted file to reduce compilation time
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  PLUGINS_CONFIG.push(new HardSourceWebpackPlugin())

  // write json file containing all webpack chunks output
  const ManifestPlugin = require('webpack-manifest-plugin')
  PLUGINS_CONFIG.push(
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    })
  )

  if (!env.development) {
    /**
     * CLEAR DIST FOLDER ON BUILD
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
    // =======================================================================//
    //    🚧 WORK IN PROGRESS !!!                                             //
    // ?  🤖 COMPRESSION PLUGIN                                               //
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

const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminWebp = require('imagemin-webp')

PLUGINS_CONFIG.push(
  new ImageminPlugin({
    disable: env.development,
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    optipng: null,
    gifsicle: {
      optimizationLevel: 3,
      // color: 286,
    },
    svgo: {
      addClassesToSVGElement: true,
    },
    jpegtran: null,
    pngquant: {
      quality: '70-80',
      speed: 1,
      strip: true,
      dithering: 0.15,
    },
    plugins: [
      imageminMozjpeg({
        quality: 75,
        progressive: true,
      }),
      imageminWebp({
        lossless: true,
        quality: 75,
      }),
    ],
    // sizes in bytes, 10000 = 10kb
    // maxFileSize: 10000000
    // minFileSize: 0
  })
)

module.exports = PLUGINS_CONFIG
