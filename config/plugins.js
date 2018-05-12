const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const path = require('path')

const env = require('./env')
const entries = require('./entries')
const urls = require('./urls')
const devServer = require('./devserver')

// css output
const cssOutputPath = path.resolve(urls.prod.code, 'css/')
const relativeCssOutput = path.relative(urls.prod.root, cssOutputPath) + '/'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const sassPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: env.serverMode
    ? relativeCssOutput + '[name].css'
    : relativeCssOutput + '[name].[hash].css',
  chunkFilename: env.devMode ? '[id].css' : '[id].[hash].css',
})

const views = entries.views({ multi: false })
const htmlExport = views.map(
  view =>
    new HtmlWebpackPlugin({
      title: env.appTitle,
      template: `${urls.dev.root + view}`,
      filename: `${view.replace('.twig', '.html')}`,
      inject: 'body',
      showErrors: env.devMode ? true : false,
      minify: {
        removeComments: true,
        removeRedundantAttributes: true,
      },
    })
)

const webpackNotifier = new WebpackBuildNotifierPlugin({
  title: env.appTitle,
  logo: path.resolve(urls.dev.root, 'favicon.png'),
  suppressSuccess: true,
  sound: false,
})

const mainConfigPlugins = [sassPlugin, webpackNotifier].concat(
  views.length ? [...htmlExport] : []
)

const pluginsExport = { mainConfigPlugins }

if (env.serverMode) {
  // HMR
  devServer.hot &&
    mainConfigPlugins.push(new webpack.HotModuleReplacementPlugin())
}

if (!env.serverMode) {
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
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

  if (!env.devMode) {
    // clear dist folder
    const relativeDist = path.relative(urls.BASE_URL, urls.prod.root) + '/'
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    mainConfigPlugins.push(
      new CleanWebpackPlugin([relativeDist], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
      })
    )

    const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
    // generate favicons
    mainConfigPlugins.push(
      new FaviconsWebpackPlugin(urls.dev.root + 'favicon.png')
    )
  }
}

module.exports = pluginsExport
