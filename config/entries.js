const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const urls = require("./urls");
const env = require("./env");
const devServer = require("./devserver");
const glob = require('glob-fs')({ gitignore: true });

// =======================================================================//
// !  CONFIG ENTRIES / SCRIPTS / BUNDLES                                  //
// =======================================================================//
let SCRIPTS = {};
fs
  .readdirSync(urls.APP_ASSETS_URL + "js")
  .filter(file => file.match(/.js/))
  .map(path => {
    // all these files are now entries
    const bundle_name = path.replace(".js", "");
    SCRIPTS[`${bundle_name}_bundle`] = [`${urls.APP_ASSETS_URL}js/${path}`];
  });

// =======================================================================//
// !  CONFIG VIEWS / HTML                                                 //
// =======================================================================//
const VIEWS = fs
  .readdirSync(urls.APP_URL)
  .filter(file => file.match(/.ejs$/))
  .map(view => {
    // all these files are now outputs
    return new HtmlWebpackPlugin({
      title: '👋 Give me a title 🔥',
      template: `${urls.BASE_URL}/app/${view}`,
      filename: `${view.replace('.ejs', '.html')}`,
      inject: "body",
      showErrors: env.devMode ? true : false,
      minify: {
        removeComments: true,
        removeRedundantAttributes: true
      }
    });
  });

const FILES = glob
              .readdirSync("app/src/media/**/*",
              (err, files) => err ? console.log('Error', err) : files)
              .filter(file => file.match(/\./))
              .map(file => urls.BASE_URL + "/" + file)

module.exports = {
  SCRIPTS,
  VIEWS,
  FILES
};
