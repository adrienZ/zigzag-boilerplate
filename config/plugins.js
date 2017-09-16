const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

const env = require("./env");
const entries = require("./entries");
const loaders = require("./loaders");
const urls = require("./urls");

const plugins = [
  // get all the views as HtmlWebpackPlugin instance
  ...entries.VIEWS,
  loaders.extractSass
];

const getHashedFileIntoTheBundle = function() {
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

        const htmlOutput = html.replace(
          new RegExp(
            "<script\\s+src=([\"'])(.+?)" + bundle_name + "\\.js\\1",
            "i"
          ),
          "<script src=$1$2" + stats.assetsByChunkName[bundle_name] + "$1"
        );

        fs.writeFileSync(path.resolve(urls.DIST_URL, htmlFileName), htmlOutput);
      });
    }
  });
};

if (!env.devMode) {
  // manifest for hashes
  plugins.push(
    new ManifestPlugin({
      fileName: "webpack-manifest.json"
    })
  );

  !env.fullJsApp && plugins.push(getHashedFileIntoTheBundle);

  // clear dist folder
  env.clearDist &&
    plugins.push(
      new CleanWebpackPlugin(["dist"], {
        root: urls.BASE_URL,
        verbose: true,
        dry: false,
        exclude: ["dist/src/media/"]
      })
    );

  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[chunkhash].js",
      minChunks(module) {
        return module.context && module.context.indexOf("node_modules") >= 0;
      }
    })
  );
}

module.exports = plugins;
