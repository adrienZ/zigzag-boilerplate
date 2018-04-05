const path = require('path')

// =======================================================================//
// !  CONFIG			                                                        //
// =======================================================================//
const urls = require('./config/urls');
const entries = require('./config/entries');
const loaders = require('./config/loaders');
const env = require('./config/env');
const plugins = require('./config/plugins');
const devServer = require('./config/devserver');

// src/js
const jsOutput = path.relative(urls.dev.base, urls.aliases["@js"]) + "/"

const mainConfig = 	{
  name: 'MAIN CONFIG',
  devServer: devServer,
  entry: entries.SCRIPTS,
  resolve: {
    alias: urls.aliases
  },
  output: {
    path: urls.prod.base,
    publicPath: env.devMode ? "" : env.prodUrl || "",
    // not at the root
    filename: env.devMode ? jsOutput + '[name].js' : jsOutput + '[name].[hash:8].js'
  },
  devtool: env.devMode ? 'cheap-module-eval-source-map' : 'eval',
  module: {
    loaders: [
      loaders.eslint,
      loaders.js,
      loaders.sass,
      loaders.css,
      loaders.files,
      loaders.imgs
    ]
  },
  plugins: plugins.mainConfigPlugins
}

module.exports = mainConfig;
