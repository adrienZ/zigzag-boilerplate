const ip = require('ip')
const path = require('path')
const urls = require('./webpack/urls')

module.exports = {
  globals: {
    titleColor: '#d81b60',
    listTest: [16, 24, 32],
    imgSizes: {
      medium: 120,
      small: 60,
    },
    $img: path.relative(urls.dev.root, urls.aliases.img),
    $fonts: path.relative(urls.dev.root, urls.aliases.fonts),
  },

  devServer: {
    port: 8899,
    isHttps: false,
    hmr: true,
    useBroswerSync: true,
    // can't touch this
    ip: ip.address(),
  },
}
