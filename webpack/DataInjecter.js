const { globals } = require('../zigzag.config')

class DataInjecter {
  constructor() {
    this.data = {}
  }

  getInlineData() {
    const data = this.data

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
        .map(
          // remove '$' because it breaks scss variable declaration
          varName => `$${varName.replace('$', '')}: ${verifiedObject[varName]}`
        )
        // add commas
        .join('; ') + ';'
    )
  }
}

const instance = new DataInjecter()
instance.data = globals

module.exports = instance
