// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//
const path = require("path");
const base_url = path.resolve(__dirname, '../');

module.exports = {
  BASE_URL: base_url,
  APP_URL: path.join(base_url, "/app/"),
  APP_ASSETS_URL: path.join(base_url, "/app/src/"),
  DIST_URL: path.join(base_url, "/dist/"),
  DIST_APP_ASSETS_URL: path.join(base_url, "/dist/src/"),
  CONFIG: __dirname
};
