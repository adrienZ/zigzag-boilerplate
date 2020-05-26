const ip = require('ip')

module.exports = {
  globals: {
    titleColor: '#d81b60',
    listTest: [16, 24, 32],
    imgSizes: {
      medium: 120,
      small: 60,
    },
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
