const urls = require('./urls')
const path = require('path')
const env = require('./env')
const { globals } = require('../zigzag.config')

// TODO:
//    - relatives gestion is fucked up

class DataInjecter {
  constructor() {
    this.data = {}
  }

  setData(values) {
    // set data and handle aliases
    this.relatives = Object.keys(urls.relatives).reduce((acc, key) => {
      // prefix relative var with a $
      const serializedKey = key.replace('relative-', '').replace('@', '$')
      acc[serializedKey] = urls.relatives[key]
      return acc
    }, {})

    this.relativesScss = this._globalizeRelativesUrls(this.relatives)

    this.data = values
  }

  _globalizeRelativesUrls(aliases) {
    const obj = {}

    Object.keys(aliases).map(key => {
      // $ for scss variable
      const keyWithoutArobase = key.replace('$', '')

      // fix css broken relatives path in build
      const prodCssUrl = path.resolve(urls.prod.code, '/css/')
      const $sassUrl = env.webpack_server
        ? aliases[key]
        : path.resolve(prodCssUrl, urls.prod.root, aliases[key])

      obj[keyWithoutArobase] = $sassUrl
    })

    return obj
  }

  getData() {
    return Object.assign({}, this.relatives, this.data)
  }

  getInlineData() {
    const data = Object.assign(
      {},
      this._globalizeRelativesUrls(this.relativesScss),
      this.data
    )

    const { stringify, parse } = JSON

    // stringify before parse
    // => remove null, undefined values and functions
    const verifiedObject = parse(stringify(data), (key, value) => {
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

    return (
      Object.keys(verifiedObject)
        // format for scss
        .map(varName => `$${varName}: ${verifiedObject[varName]}`)
        // add commas
        .join('; ') + ';'
    )
  }
}

const instance = new DataInjecter()
instance.setData(globals)

module.exports = instance
