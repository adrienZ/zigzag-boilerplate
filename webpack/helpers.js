const env = require('./env')
const urls = require('./urls')
const path = require('path')

function getInlineDataScss(data) {
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

    // object to sass map
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
      .map(
        // remove '$' because it breaks scss variable declaration
        varName => {
          let value = verifiedObject[varName]
          // HANDLE WEBPACK ALIASES
          // i consider keys who begin by '$' are aliases
          if (!env.webpack_server && varName[0] === '$') {
            // fix css broken relatives path in build
            const prodCssUrl = path.resolve(urls.prod.code, '/css/')
            value = path.resolve(prodCssUrl, urls.prod.root, value)
          }

          return `$${varName.replace('$', '')}: ${value}`
        }
      )
      // add commas
      .join('; ') + ';'
  )
}

module.exports = {
  getInlineDataScss,
}
