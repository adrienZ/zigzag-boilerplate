const path = require('path')

const urls = require('./config/urls')
const devServer = require('./config/devserver')
const entries = require('./config/entries')
const env = require('./config/env')
const loaders = require('./config/loaders')
const plugins = require('./config/plugins')

// src/js
const jsOutput = path.relative(urls.dev.root, urls.aliases['@js'])

module.exports = {
  devServer: devServer,
  entry: { ...entries.scripts({ multi: false }), ...entries.imgs },
  resolve: {
    alias: urls.aliases,
  },
  output: {
    path: urls.prod.root,
    publicPath: env.publicPath,
    // TODO: no idea why i wrote this line
    chunkFilename: '[name].bundle.js',
    filename: env.serverMode
      ? jsOutput + '/[name].js'
      : jsOutput + '/[name].[hash:8].js',
  },
  devtool: env.devMode ? 'cheap-module-eval-source-map' : 'source-map',
  // TODO: improve mode handling
  mode: 'development',
  module: {
    rules: [
      loaders.sass,
      loaders.js,
      loaders.eslint,
      loaders.imgs,
      loaders.files,
    ],
  },
  plugins,
}
