import { checkIsObject } from '../helpers.js'

const INDENT_SIZE = 4
const SHIFT_SIZE = 2

const formatValue = (value, depth) => {
  if (!checkIsObject(value)) {
    return String(value)
  }

  const indent = ' '.repeat(INDENT_SIZE * depth)
  const bracketIndent = ' '.repeat(INDENT_SIZE * (depth - 1))

  const entries = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${formatValue(val, depth + 1)}`
  })

  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (diffEntries, depth = 1) => {
  const indent = ' '.repeat(INDENT_SIZE * depth)
  const signIndent = ' '.repeat(INDENT_SIZE * depth - SHIFT_SIZE)

  const lines = []
  for (const diffEntry of diffEntries) {
    if (diffEntry.type === 'nested') {
      const nestedLines = formatStylish(diffEntry.children, depth + 1)
      lines.push(`${indent}${diffEntry.key}: {\n${nestedLines}\n${indent}}`)
      continue
    }

    if (diffEntry.type === 'added') {
      lines.push(`${signIndent}+ ${diffEntry.key}: ${formatValue(diffEntry.value, depth + 1)}`)
      continue
    }

    if (diffEntry.type === 'removed') {
      lines.push(`${signIndent}- ${diffEntry.key}: ${formatValue(diffEntry.value, depth + 1)}`)
      continue
    }

    if (diffEntry.type === 'unchanged') {
      lines.push(`${indent}${diffEntry.key}: ${formatValue(diffEntry.value, depth + 1)}`)
      continue
    }

    if (diffEntry.type === 'changed') {
      lines.push(
        [
          `${signIndent}- ${diffEntry.key}: ${formatValue(diffEntry.oldValue, depth + 1)}`,
          `${signIndent}+ ${diffEntry.key}: ${formatValue(diffEntry.newValue, depth + 1)}`,
        ].join('\n'),
      )
      continue
    }
  }

  return lines.join('\n')
}

export default diffTree => `{\n${formatStylish(diffTree, 1)}\n}`
