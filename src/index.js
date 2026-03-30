import { buildDiff, diffEntryToString, readFile } from './utils'

const genDiff = (filePath1, filePath2) => {
  const entry1 = readFile(filePath1)
  const entry2 = readFile(filePath2)
  const diffEntry = buildDiff(entry1, entry2)

  return diffEntryToString(diffEntry)
}

export default genDiff
