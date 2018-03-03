const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = require("./env");
const entries = require("./entries");
const loaders = require("./loaders");
const urls = require("./urls");
const devServer = require("./devserver");
const h = require("./helpers");

const htmlExport = entries.VIEWS.map(view => new HtmlWebpackPlugin({
  title: env.appTitle,
  template: `${urls.APP_URL}${view}`,
  filename: `${view.replace('.ejs', '.html')}`,
  inject: "body",
  showErrors: env.devMode ? true : false,
  minify: {
    removeComments: true,
    removeRedundantAttributes: true
  }
}));


const mainConfigPlugins = [
  // get all the views as HtmlWebpackPlugin instance
  // build css from scss import
  ...htmlExport,
  loaders.extractSass
];

// HMR
devServer.hot && mainConfigPlugins.push(
  new webpack.HotModuleReplacementPlugin()
);

if (!env.devMode) {
  // manifest for hashes
  mainConfigPlugins.push(
    new ManifestPlugin({
      fileName: "webpack-manifest.json"
    })
  );

  // some webpack optimization
  mainConfigPlugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  mainConfigPlugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  // clear dist folder
  if (env.clearDist) {
    const relativeDist = h.getRelativePath(urls.DIST_URL, urls.BASE_URL).substring(1); // dist
    const relativeDistMedia = h.getRelativePath(urls.DIST_MEDIA_URL, urls.BASE_URL).substring(1); // dist/src/media

    mainConfigPlugins.push(
      new CleanWebpackPlugin([relativeDist], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
        // exclude: [relativeDistMedia]
      })
    );

    // generate favicons
    mainConfigPlugins.push(new FaviconsWebpackPlugin(urls.APP_URL + 'favicon.png'));

    // generate manifest
    const distSrc = h.getRelativePath(urls.DIST_ASSETS_URL, urls.DIST_URL)
    mainConfigPlugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: distSrc + "vendor.[hash].js",
        minChunks(module) {
          return module.context && module.context.indexOf("node_modules") >= 0;
        }
      })
    );
  }
}

module.exports = { mainConfigPlugins };
