const fs = require("fs");
const urls = require("./urls");
const glob = require('glob-fs')({ gitignore: true });

// =======================================================================//
// !  CONFIG ENTRIES / SCRIPTS / BUNDLES                                  //
// =======================================================================//
let SCRIPTS = {};
const jsPath = urls.aliases["@js"];

fs.readdirSync(jsPath)
  .filter(file => file.match(/.js/))
  .map(path => {
    // all these files are now entries
    const bundle_name = path.replace(".js", "");
    SCRIPTS[`${bundle_name}_bundle`] = [`${jsPath}/${path}`];
  });

// =======================================================================//
// !  CONFIG VIEWS / HTML                                                 //
// =======================================================================//
const VIEWS = fs
  .readdirSync(urls.APP_URL)
  .filter(file => file.match(/.ejs$/))

// =======================================================================//
// !  FILES: IMG / VIDEO / FONTS ...                                      //
// =======================================================================//
const FILES =
glob
  .readdirSync("app/src/media/**/*",
    (err, files) => err ? console.log('Error', err) : files)
  .filter(file => file.match(/\./))
  .map(file => urls.BASE_URL + "/" + file)

module.exports = { SCRIPTS, VIEWS, FILES };
