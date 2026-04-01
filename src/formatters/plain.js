import { checkIsObject } from '../helpers.js'

const formatValue = (value) => {
  if (checkIsObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const formatPlain = (diffEntries, path = '') => {
  const lines = []

  for (const diffEntry of diffEntries) {
    const property = path ? `${path}.${diffEntry.key}` : diffEntry.key

    if (diffEntry.type === 'nested') {
      lines.push(formatPlain(diffEntry.children, property))
      continue
    }

    if (diffEntry.type === 'added') {
      lines.push(`Property '${property}' was added with value: ${formatValue(diffEntry.value)}`)
      continue
    }

    if (diffEntry.type === 'removed') {
      lines.push(`Property '${property}' was removed`)
      continue
    }

    if (diffEntry.type === 'unchanged') {
      continue
    }

    if (diffEntry.type === 'changed') {
      lines.push(`Property '${property}' was updated. From ${formatValue(diffEntry.oldValue)} to ${formatValue(diffEntry.newValue)}`)
      continue
    }
  }

  return lines.join('\n')
}

export default formatPlain
