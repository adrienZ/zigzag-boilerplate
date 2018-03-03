// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//
const path = require("path");
const base_url = path.resolve(__dirname, "../");
const urls = {
  dev: {
    base: path.join(base_url, "/app/"),
    assets: path.join(base_url, "/app/src/"),
    media: path.join(base_url, "/app/src/media/"),
  },
  prod: {
    base: path.join(base_url, "./dist/"),
    assets: path.join(base_url, "/dist/src/"),
    media: path.join(base_url, "/dist/src/media/")
  },
  CONFIG: __dirname,
  BASE_URL: base_url,
};

const aliases = {
  "@js": path.resolve(urls.dev.assets, "js/"),
  "@sass": path.resolve(urls.dev.assets, "sass/"),
  "@img": path.resolve(urls.dev.media, "img/"),
  "@fonts": path.resolve(urls.dev.media, "fonts/"),
  "@video": path.resolve(urls.dev.media, "video/"),
};

module.exports = {...urls, aliases};
