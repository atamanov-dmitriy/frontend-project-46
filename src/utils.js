import fs from 'fs'
import path from 'path'

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const data = JSON.parse(content)
  return data
}

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

const diffEntryToString = (diffEntries) => {
  const lines = diffEntries
    .map((diffEntry) => {
      if (diffEntry.type === 'added') {
        return `  + ${diffEntry.key}: ${diffEntry.value}`
      }
      if (diffEntry.type === 'removed') {
        return `  - ${diffEntry.key}: ${diffEntry.value}`
      }
      if (diffEntry.type === 'unchanged') {
        return `    ${diffEntry.key}: ${diffEntry.value}`
      }
      if (diffEntry.type === 'changed') {
        return `  - ${diffEntry.key}: ${diffEntry.oldValue}\n  + ${diffEntry.key}: ${diffEntry.newValue}`
      }
    })
    .join('\n')

  return `{\n${lines}\n}`
}

export { buildDiff, readFile, diffEntryToString }
