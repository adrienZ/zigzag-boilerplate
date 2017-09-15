// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ip = require('ip');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV === 'dev';
const clearDist = process.env.CLEAR_DIST;

const urls = require('./config/urls');
const entries = require('./config/entries');

const extractSass = new ExtractTextPlugin({
	filename: 'src/css/[name].css',
	disable: process.env.NODE_ENV === 'development'
});
// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//

const DEV_SERVER = {
	contentBase: path.join(urls.BASE_URL, 'dist'),
	// change this as you want
	compress: true, // enable gzip compression
	inline: false, // iframe mode,
  noInfo: true, // cut the fat
  overlay: true,
	historyApiFallback: false, // history API fallback.
	hot: false, // hot reload
	https: false, // open new tab
	open: false, // remove useless infos
  port: 1234,
  host:  ip.adrees, //current ip, same url for multiple devices
	quiet: true, // shut down console
}

let configs = [
	{
		name: 'JS + HTML CONFIG',
		devServer: DEV_SERVER,
    entry: entries.SCRIPTS,
    resolve: {
      alias: {
        '@js': path.resolve(urls.APP_ASSETS_URL, 'js/')
      },
    },
		output: {
			path: path.resolve(urls.BASE_URL, './dist/'),
			// not at the root
			filename: devMode ? 'src/js/[name].js' : 'src/js/[name].[chunkhash:8].js'
    },
    devtool: devMode ? 'cheap-eval-source-map' : false,
		module: {
			loaders: [
				{
					// ES6
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: ['babel-loader']
				}
			]
		},
		plugins: [// get all the views as HtmlWebpackPlugin instance
			...entries.VIEWS]
	}, {
		name: 'CUSTOM SASS CONFIG',
		devServer: DEV_SERVER,
    entry: entries.STYLES,
		output: {
			path: path.resolve(urls.BASE_URL, './dist/'),
			// not at the root
			filename: devMode ? 'src/css/[name].css' : 'src/css/[name].[chunkhash:8].css'
    },
    devtool: devMode ? 'cheap-eval-source-map' : false,
		module: {
			loaders: [
				{
					test: /\.scss$/,
					exclude: /fonts/,
					use: extractSass.extract({
						use: [
							{
								loader: 'css-loader?importLoaders=1'
							}, {
								loader: 'postcss-loader'
							}, {
								loader: 'sass-loader'
							}
						],
						// use style-loader in development
						fallback: 'style-loader'
					})
				},
				{
					test: /\.(woff|woff2|eot|ttf|svg|jpg|png|jpeg|gif|tiff|cr2)$/,
					loader: 'url-loader?limit=100'
				}
			]
		},
		plugins: [extractSass]
	}
];

if (!devMode) {
  // manifest for hashes
  configs[0].plugins.push(
    new ManifestPlugin({
      basePath: '/dist/',
      fileName: 'webpack-manifest.json',
    })
  );

  // clear dist folder
  clearDist && configs[0].plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: urls.BASE_URL,
      verbose: true,
      dry: false,
      exclude: ['dist/src/media/']
    })
  );

  configs.map( config => {
    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks (module) {
        return module.context &&
              module.context.indexOf('node_modules') >= 0;
      }
    }));

  });
}
module.exports = configs;
