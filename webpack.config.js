// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const webpack = require('webpack');

// =======================================================================//
// !  CONFIG			                                                        //
// =======================================================================//
const urls = require('./config/urls');
const entries = require('./config/entries');
const loaders = require('./config/loaders');
const env = require('./config/env');
const plugins = require('./config/plugins');
const devServer = require('./config/devserver.js');

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
		filename: env.devMode ? 'src/js/[name].js' : 'src/js/[name].[chunkhash:8].js'
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
  name: 'static',
  entry: entries.FILES,
  output: {
    path: urls.DIST_ASSETS_URL + "media/",
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
