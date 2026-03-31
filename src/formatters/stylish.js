const INDENT_SIZE = 4

const stringifyValue = (value, depth) => {
  if (!(value !== null && typeof value === 'object' && !Array.isArray(value))) {
    return String(value)
  }

  const indent = ' '.repeat(INDENT_SIZE * depth)
  const bracketIndent = ' '.repeat(INDENT_SIZE * (depth - 1))

  const entries = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${stringifyValue(val, depth + 1)}`
  })

  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

const stylish = (diffEntries, depth = 1) => {
  const indent = ' '.repeat(INDENT_SIZE * depth)
  const signIndent = ' '.repeat(INDENT_SIZE * depth - 2)

  const lines = diffEntries
    .map((diffEntry) => {
      if (diffEntry.type === 'nested') {
        const nestedLines = stylish(diffEntry.children, depth + 1)
        return `${indent}${diffEntry.key}: {\n${nestedLines}\n${indent}}`
      }

      if (diffEntry.type === 'added') {
        return `${signIndent}+ ${diffEntry.key}: ${stringifyValue(diffEntry.value, depth + 1)}`
      }
      if (diffEntry.type === 'removed') {
        return `${signIndent}- ${diffEntry.key}: ${stringifyValue(diffEntry.value, depth + 1)}`
      }
      if (diffEntry.type === 'unchanged') {
        return `${indent}${diffEntry.key}: ${stringifyValue(diffEntry.value, depth + 1)}`
      }
      if (diffEntry.type === 'changed') {
        return [
          `${signIndent}- ${diffEntry.key}: ${stringifyValue(diffEntry.oldValue, depth + 1)}`,
          `${signIndent}+ ${diffEntry.key}: ${stringifyValue(diffEntry.newValue, depth + 1)}`,
        ].join('\n')
      }
    })
    .join('\n')

  return `${lines}`
}

export default diffTree => `{\n${stylish(diffTree, 1)}\n}`
