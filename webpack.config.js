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
    path: urls.prod.base,
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

const staticsConfig = {
  name: 'statics',
  entry: entries.FILES,
  output: {
    path: urls.prod.media,
    filename: 'media.js'
  },
  module: {
    loaders: [
      loaders.files
    ]
  },
  plugins: plugins.staticsConfigPlugins
}

const config = [
  mainConfig,
]

if (entries.FILES.length > 0 && env.compileAll) config.push(staticsConfig)

module.exports = config;
