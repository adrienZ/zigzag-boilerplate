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

    // url helpers
    $img: path.relative(urls.dev.root, path.resolve(urls.dev.assets, 'img/')),
    $fonts: path.relative(
      urls.dev.root,
      path.resolve(urls.dev.assets, 'fonts/')
    ),
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
