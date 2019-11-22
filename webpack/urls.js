// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//

const path = require('path')
const env = require('./env')

const base_url = path.resolve(__dirname, '../')

const urls = {
  dev: {
    root: path.join(base_url, '/app/'),
    code: path.join(base_url, '/app/src/'),
    assets: path.join(base_url, '/app/assets/'),
  },
  prod: {
    root: path.join(base_url, '/dist/'),
    code: path.join(base_url, '/dist/src/'),
    assets: path.join(base_url, '/dist/assets/'),
    favicons: path.join(base_url, '/dist/icons/'),
  },
  CONFIG: __dirname,
  BASE_URL: base_url,
}


/**
 * COMING SOON !!!!
 * the new alisases syntax allow us to use system path as usual
 * we also want to use relative path to use it with a backend
 * also some of the aliases could be used in our data injection code bellow
 */


const aliases = {
  '@js': path.resolve(urls.dev.code, 'js/'),
  '@sass': path.resolve(urls.dev.code, 'sass/'),
  '@base': path.resolve(urls.dev.root),
  '@img': path.resolve(urls.dev.assets, 'img/'),
  '@fonts': path.resolve(urls.dev.assets, 'fonts/'),
}

/**
 * we reuse our aliases in severals plugins
 * this allow us to use the across the in several language
 *
 * since relative alias won't be resolved by webpack
 * we must replace the '@' character, in this case by '$'
 */


const dataInjection = {
  // htmlWebpackPlugin
  html: {},
  // sass loader
  sass: ''
}

const relatives = {
  '@relative-img': path.relative(urls.dev.root, urls.dev.assets + "/img"),
  '@relative-fonts': path.relative(urls.dev.root, urls.dev.assets + "/fonts"),
}

Object.keys(relatives).forEach(key => {
  const keyWithoutArobase = key
    .replace('relative-', '')
    .replace('@', '$')

  dataInjection.html[keyWithoutArobase] = relatives[key]

  // fix css broken relatives path in build
  const prodCssUrl = path.resolve(urls.prod.code, '/css/')
  const $sassUrl = env.serverMode ?
    relatives[key]
    : path.resolve(prodCssUrl, urls.prod.root, relatives[key])

  dataInjection.sass += `${keyWithoutArobase}: "${$sassUrl}";`
})


module.exports = { ...urls, aliases, ...dataInjection }
