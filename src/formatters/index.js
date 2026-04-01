import plain from './plain.js'
import stylish from './stylish.js'

const format = (tree, formatName) => {
  if (formatName === 'plain') {
    return plain(tree)
  }

  return stylish(tree)
}

export default format
