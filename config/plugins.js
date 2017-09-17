const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

const env = require("./env");
const entries = require("./entries");
const loaders = require("./loaders");
const urls = require("./urls");
const devServer = require("./devserver.js");

const mainConfigPlugins = [
  // get all the views as HtmlWebpackPlugin instance
  ...entries.VIEWS,
  loaders.extractSass
];
const staticSassConfigPlugins = [loaders.extractStaticSass];

// HMR
devServer.hot && mainConfigPlugins.push(new webpack.HotModuleReplacementPlugin());

if (!env.devMode) {
  // manifest for hashes
  mainConfigPlugins.push(
    new ManifestPlugin({
      fileName: "webpack-manifest.json"
    })
  );

  // clear dist folder
  env.clearDist &&
    mainConfigPlugins.push(
      new CleanWebpackPlugin(["dist"], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
        exclude: ["dist/src/media/"]
      })
    );

  mainConfigPlugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  mainConfigPlugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  mainConfigPlugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "src/vendor.[hash].js",
      minChunks(module) {
        return module.context && module.context.indexOf("node_modules") >= 0;
      }
    })
  );

  if (!env.fullJsApp) {
    staticSassConfigPlugins.push(
      new ManifestPlugin({
        fileName: "statics-webpack-manifest.json"
      })
    );

    const getHashedScriptIntoTheBundle = function() {
      this.plugin("done", function(statsData) {
        const stats = statsData.toJson();

        if (!stats.errors.length) {
          entries.VIEWS.map(view => {
            const htmlFileName = view.options.filename;
            const html = fs.readFileSync(
              path.resolve(urls.APP_URL, htmlFileName),
              "utf8"
            );
            const bundle_name = Object.keys(stats.assetsByChunkName)[0];

            let htmlOutput = html;

            const jsRegexp = new RegExp(
              "<script\\s+src=([\"'])(.+?)" + bundle_name + "\\.js\\1",
              "i"
            );
            if (
              stats.assetsByChunkName[bundle_name].indexOf(".js") &&
              htmlOutput.match(jsRegexp) !== null
            ) {
              htmlOutput = htmlOutput.replace(
                jsRegexp,
                "<script src=$1$2" + stats.assetsByChunkName[bundle_name] + "$1"
              );
              fs.writeFileSync(
                path.resolve(urls.DIST_URL, htmlFileName),
                htmlOutput
              );
            }
          });
        }
      });
    };

    // !env.fullJsApp && mainConfigPlugins.push(getHashedScriptIntoTheBundle);
    // !env.fullJsApp && staticSassConfigPlugins.push(getHashedStylesIntoTheBundle);
  }
}

const plugins = {
  mainConfigPlugins,
  staticSassConfigPlugins
};

module.exports = plugins;
