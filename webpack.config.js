// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const path = require('path');
const webpack = require('webpack');

const urls = require('./config/urls');
const entries = require('./config/entries');
const loaders = require('./config/loaders');
const env = require('./config/env');
const plugins = require('./config/plugins');

const devServer = require('./config/devserver.js');


let config =
	{
		name: 'MAIN CONFIG',
		devServer: devServer,
    entry: entries.ALL,
    resolve: {
      alias: urls.aliases
    },
		output: {
			path: path.resolve(urls.BASE_URL, './dist/'),
			// not at the root
			filename: env.devMode ? 'src/js/[name].js' : 'src/js/[name].[chunkhash:8].js'
    },
    devtool: env.devMode ? 'cheap-eval-source-map' : false,
		module: {
			loaders: [
				loaders.eslint,
				loaders.js,
				loaders.sass,
				loaders.css,
			]
    },
    externals: {
      jquery: 'jQuery'
    },
		plugins: plugins
	}

module.exports = config;
