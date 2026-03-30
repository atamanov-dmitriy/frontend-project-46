import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

test('gendiff compares flat json file', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const result = genDiff(file1, file2)

  expect(result).toMatchSnapshot()
})
