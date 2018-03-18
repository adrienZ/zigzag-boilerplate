const fs = require("fs");

const urls = require("./urls");

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
  .readdirSync(urls.dev.base)
  .filter(file => file.match(/.ejs$/))

module.exports = { SCRIPTS, VIEWS };
