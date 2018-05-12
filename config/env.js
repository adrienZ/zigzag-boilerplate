module.exports = {
  serverMode: process.env.NODE_ENV === 'dev',
  devMode:
    process.env.NODE_ENV === 'dev' ||
    process.argv.indexOf('--mode=production') === -1,
  clearDist: process.env.CLEAR_DIST,
  appTitle: '👋 Give me a title 🔥',
}
