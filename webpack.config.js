// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const path = require('path');
const webpack = require("webpack");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//
const BASE_URL = path.join(__dirname);
const APP_URL = path.join(__dirname) + '/app/';
const APP_ASSETS_URL = path.join(__dirname) + '/app/src/';
const DIST_URL = path.join(__dirname) + '/dist/';
const DIST_APP_ASSETS_URL = path.join(__dirname) + '/dist/src/';



// =======================================================================//
// !  CONFIG ENTRIES / SCRIPTS / BUNDLES                                  //
// =======================================================================//
let BUNDLES = {};
fs.readdirSync(APP_ASSETS_URL + 'js').filter((file) => {
  // get all .js at the root of app/src/js
  return file.match(/.js/);
}).map(path => {
  // all these files are now entries
  const bundle_name = path.replace('.js', '');
  BUNDLES[`${bundle_name}_bundle`] = [`${APP_ASSETS_URL}js/${path}`];
});



// =======================================================================//
// !  CONFIG VIEWS / HTML                                                 //
// =======================================================================//
const VIEWS = fs.readdirSync(APP_URL).filter(file => {
  // get all .html at the root of app/
  return file.match(/.html$/);
}).map(view => {
  // all these files are now outputs
  return new HtmlWebpackPlugin({
    template: `${BASE_URL}/app/${view}`,
    filename: `${view}`,
    inject: 'body',
    /*
      /!\  this one is tricky /!\
      prevent code of config entries to fire.
      scripts/bundles have to be called in .html to be executed
    */
    excludeChunks: Object.keys(BUNDLES).map(bundle_name =>  bundle_name)
  });
});

// =======================================================================//
// !  CONFIG DEV SERVER                                                   //
// =======================================================================//
const DEV_SERVER = {
  contentBase: path.join(BASE_URL, "dist"),
  compress: true,
  // change this as you want
  port: 1234
}

module.exports = [
  {
    name: 'JS + HTML, NO SASS YET',
    devServer: DEV_SERVER,
    entry: BUNDLES,
    output: {
      path: path.resolve(BASE_URL, "./dist/"),
      // not at the root
      filename: 'src/js/[name].js'
    },
    module: {
      loaders: [
        {
          // ES6
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },
    plugins: [
      // get all the views as HtmlWebpackPlugin instance
      ...VIEWS,
    ]
  },
];
