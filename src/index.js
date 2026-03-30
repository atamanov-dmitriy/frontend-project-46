import { buildDiff, diffEntryToString, readFile, getParser } from './utils.js'

const genDiff = (filePath1, filePath2) => {
  const entry1 = readFile(filePath1, getParser)
  const entry2 = readFile(filePath2, getParser)
  const diffEntry = buildDiff(entry1, entry2)

  return diffEntryToString(diffEntry)
}

export default genDiff
