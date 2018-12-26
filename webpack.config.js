const path = require('path')

const urls = require('./webpack/urls')
const devServer = require('./webpack/devserver')
const entries = require('./webpack/entries')
const env = require('./webpack/env')
const loaders = require('./webpack/loaders')
const plugins = require('./webpack/plugins')

// src/js
const jsOutput = path.relative(urls.dev.root, urls.aliases['@js'])

module.exports = {
  devServer: devServer,
  entry: { ...entries.scripts({ multi: false }) }, // ...entries.imgs },
  resolve: {
    alias: urls.aliases,
  },
  output: {
    path: urls.prod.root,
    pathinfo: false,
    // publicPath: env.publicPath,
    chunkFilename: '[name].bundle.js',
    filename: env.serverMode
      ? jsOutput + '/[name].js'
      : jsOutput + '/[name].[hash:8].js',
  },
  devtool: env.devMode ? 'cheap-module-eval-source-map' : 'source-map',
  mode: !env.devMode ? 'production' : 'development',
  module: {
    rules: [loaders.sass, loaders.js, loaders.eslint, loaders.files],
  },
  optimization: {
    removeAvailableModules: !env.devMode,
    removeEmptyChunks: !env.devMode,
  },
  plugins,
}
