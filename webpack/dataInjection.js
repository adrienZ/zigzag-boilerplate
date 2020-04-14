const urls = require('./urls')
const path = require('path')
const env = require('./env')

// main object
const dataInjection = {
  // htmlWebpackPlugin
  html: {},
  // sass loader
  sass: '',
}

const GLOBALS = {
  titleColor: '#d81b60',
  listTest: [16, 24, 32],
  imgSizes: {
    medium: 120,
    small: 60,
  },
}

/**
 * we reuse our aliases in severals plugins / loaders
 * since relative alias won't be resolved by webpack
 * we must replace the '@' character, in this case by '$'
 *
 * @name aliasesToSass
 * @param  {Object} aliases
 * @returns {Array}
 */
function aliasesToSass(aliases) {
  return Object.keys(aliases).map(key => {
    const keyWithoutArobase = key.replace('relative-', '').replace('@', '$')

    // oops, not sass related but yolo
    dataInjection.html[keyWithoutArobase] = aliases[key]

    // fix css broken relatives path in build
    const prodCssUrl = path.resolve(urls.prod.code, '/css/')
    const $sassUrl = env.serverMode
      ? aliases[key]
      : path.resolve(prodCssUrl, urls.prod.root, aliases[key])

    return `${keyWithoutArobase}: "${$sassUrl}"`
  })
}

/**
 * @name JsonToSass
 * @param {Object} obj
 * @returns {String}
 */
function JsonToSass(obj) {
  const { stringify, parse } = JSON

  // remove null, undefined values and functions
  const objStr = stringify(obj)

  const objParsed = parse(objStr, (key, value) => {
    if (key.length === 0) return value

    // lists
    if (Array.isArray(value)) {
      return value.join(', ')
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString()
    }

    // object to sass   map
    if (value instanceof Object) {
      let subkeys = '('
      subkeys += Object.keys(value)
        .map(subkey => `"${subkey}": ${value[subkey] || ''}`)
        .join(', ')
      subkeys += ')'
      return subkeys
    }

    // default
    return value
  })

  const objAsStrings = Object.keys(objParsed).map(varName => {
    // oops, not sass related but yolo
    return `$${varName}: ${objParsed[varName]}`
  })

  const resString = objAsStrings.join('; ') + ';'

  return resString
}

// finally inject ^^
dataInjection.sass += aliasesToSass(urls.relatives).join('; ') + ';'
dataInjection.sass += JsonToSass(GLOBALS) + ';'
dataInjection.html = Object.assign(dataInjection.html, GLOBALS)

module.exports = dataInjection
