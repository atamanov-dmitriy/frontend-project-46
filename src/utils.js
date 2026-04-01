import { checkIsObject } from './helpers.js'

const buildDiff = (file1, file2) => {
  const keys = new Set([...Object.keys(file1), ...Object.keys(file2)])
  const sortedKeys = Array.from(keys).sort()

  return sortedKeys.map((key) => {
    const value1 = file1[key]
    const value2 = file2[key]

    if (!Object.hasOwn(file1, key)) {
      return { key, type: 'added', value: value2 }
    }

    if (!Object.hasOwn(file2, key)) {
      return { key, type: 'removed', value: value1 }
    }

    if (checkIsObject(value1) && checkIsObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) }
    }

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 }
    }

    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}

export { buildDiff }
