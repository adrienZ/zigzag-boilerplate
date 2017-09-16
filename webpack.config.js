// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const urls = require('./config/urls');
const entries = require('./config/entries');
const loaders = require('./config/loaders');
const env = require('./config/env');

const devServer = require('./config/devserver.js');


let config =
	{
		name: 'MAIN CONFIG',
		devServer: devServer,
    entry: env.fullJsApp ? entries.SCRIPTS : entries.ALL,
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
		plugins: [// get all the views as HtmlWebpackPlugin instance
			...entries.VIEWS,
			loaders.extractSass]
	}

if (!env.devMode) {
  // manifest for hashes
  config.plugins.push(
    new ManifestPlugin({
      // basePath: '/dist/',
      fileName: 'webpack-manifest.json',
    })
  );

  // clear dist folder
  env.clearDist && config.plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: urls.BASE_URL,
      verbose: true,
      dry: false,
      exclude: ['dist/src/media/']
    })
  );

    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks (module) {
        return module.context &&
              module.context.indexOf('node_modules') >= 0;
      }
    }));
}
module.exports = config;
