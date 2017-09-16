const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

const env = require('./env');
const entries = require('./entries');
const loaders = require('./loaders');

const plugins = [// get all the views as HtmlWebpackPlugin instance
  ...entries.VIEWS,
  loaders.extractSass,
]

if (!env.devMode) {
  // manifest for hashes
  plugins.push(
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
    })
  );

  // clear dist folder
  env.clearDist && plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: urls.BASE_URL,
      verbose: true,
      dry: false,
      exclude: ['dist/src/media/']
    })
  );

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks (module) {
        return module.context &&
              module.context.indexOf('node_modules') >= 0;
      }
    }));
}

module.exports = plugins;