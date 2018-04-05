const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const path = require('path')

const env = require('./env')
const entries = require('./entries')
const loaders = require('./loaders')
const urls = require('./urls')
const devServer = require('./devserver')

const htmlExport = entries.VIEWS.map(
  view =>
    new HtmlWebpackPlugin({
      title: env.appTitle,
      template: `${urls.dev.base + view}`,
      filename: `${view.replace('.ejs', '.html')}`,
      inject: 'body',
      showErrors: env.devMode ? true : false,
      minify: {
        removeComments: true,
        removeRedundantAttributes: true,
      },
    })
)

const mainConfigPlugins = env.compileHtml ? [...htmlExport, loaders.extractSass] : [loaders.extractSass]

const pluginsExport = { mainConfigPlugins }

// HMR
devServer.hot && mainConfigPlugins.push(new webpack.HotModuleReplacementPlugin())

if (!env.devMode) {
  mainConfigPlugins.push(new HardSourceWebpackPlugin())

  // manifest for hashes
  mainConfigPlugins.push(
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    })
  )

  // some webpack optimization
  mainConfigPlugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  mainConfigPlugins.push(new webpack.optimize.ModuleConcatenationPlugin())

  // clear dist folder
  if (env.clearDist) {
    const relativeDist = path.relative(urls.BASE_URL, urls.prod.base) + '/'

    mainConfigPlugins.push(
      new CleanWebpackPlugin([relativeDist], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
      })
    )

    // generate favicons
    mainConfigPlugins.push(new FaviconsWebpackPlugin(urls.dev.base + 'favicon.png'))

    // generate manifest
    const distSrc = path.relative(urls.prod.base, urls.prod.assets) + '/'
    mainConfigPlugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: distSrc + 'vendor.[hash].js',
        minChunks(module) {
          return module.context && module.context.indexOf('node_modules') >= 0
        },
      })
    )
  }
}

module.exports = pluginsExport
