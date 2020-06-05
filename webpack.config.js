const path = require('path')

const urls = require('./webpack/urls')
const devServer = require('./webpack/devserver')
const entries = require('./webpack/entries')
const env = require('./webpack/env')
const loaders = require('./webpack/loaders')
const plugins = require('./webpack/plugins')

// src/js
const jsOutput = path.relative(urls.dev.root, urls.aliases.js)
const prefixedAliases = Object.keys(urls.aliases).reduce((acc, alias) => {
  acc['$' + alias] = urls.aliases[alias]
  return acc
}, {})

module.exports = {
  devServer,
  entry: entries.js,
  resolve: {
    alias: prefixedAliases,
  },
  output: {
    chunkFilename: '[name].bundle.js',
    filename: env.webpack_server
      ? jsOutput + '/[name].js'
      : jsOutput + '/[name].[hash:8].js',
  },
  devtool: env.development ? 'cheap-module-eval-source-map' : 'source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      loaders.sass,
      loaders.js,
      loaders.eslint,
      loaders.shader,
      loaders.vue,
    ],
  },
  optimization: {
    noEmitOnErrors: env.production,
    splitChunks: {
      // all chunks, not async
      chunks: 'all',
      minChunks: 2,
    },
  },
  plugins,
}
