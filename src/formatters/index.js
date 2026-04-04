import formatPlain from './plain.js'
import formatStylish from './stylish.js'
import formatJson from './json.js'

const format = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(tree)
    case 'json':
      return formatJson(tree)
    case 'stylish':
      return formatStylish(tree)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default format
