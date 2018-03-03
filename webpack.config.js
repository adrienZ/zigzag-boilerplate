// =======================================================================//
// !  CONFIG			                                                        //
// =======================================================================//
const urls = require('./config/urls');
const entries = require('./config/entries');
const loaders = require('./config/loaders');
const env = require('./config/env');
const plugins = require('./config/plugins');
const devServer = require('./config/devserver');
const h = require('./config/helpers');

// src/js
const jsOutput = h.getRelativePath(urls.aliases["@js"]) + '/'

const mainConfig = 	{
  name: 'MAIN CONFIG',
  devServer: devServer,
  entry: entries.SCRIPTS,
  resolve: {
    alias: urls.aliases
  },
  output: {
    path: urls.DIST_URL,
    // not at the root
    filename: env.devMode ? jsOutput + '[name].js' : jsOutput + '[name].[hash:8].js'
  },
  devtool: env.devMode ? 'source-map' : false,
  module: {
    loaders: [
      loaders.eslint,
      loaders.js,
      loaders.sass,
      loaders.css,
      loaders.files
    ]
  },
  plugins: plugins.mainConfigPlugins
}

const staticConfig = {
  name: 'statics',
  entry: entries.FILES,
  output: {
    path: urls.DIST_MEDIA_URL,
    filename: 'media.js'
  },
  module: {
    loaders: [
      loaders.files
    ]
  }
}


const config = [
  mainConfig,
]
entries.FILES.length > 0 && config.push(staticConfig)

module.exports = config;
