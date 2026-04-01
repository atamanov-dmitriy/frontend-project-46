import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

// json
test('gendiff compares nested file (stylish)', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const result = genDiff(file1, file2)

  expect(result).toMatchSnapshot()
})

// yaml
test('gendiff compares nested file (stylish)', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  const result = genDiff(file1, file2)

  expect(result).toMatchSnapshot()
})

// json
test('gendiff compares nested file (plain)', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const result = genDiff(file1, file2, 'plain')

  expect(result).toMatchSnapshot()
})

// yaml
test('gendiff compares nested file (plain)', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  const result = genDiff(file1, file2, 'plain')

  expect(result).toMatchSnapshot()
})

// json
test('gendiff compares nested file (json)', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const result = genDiff(file1, file2, 'json')

  expect(result).toMatchSnapshot()
})

// yaml
test('gendiff compares nested file (json)', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  const result = genDiff(file1, file2, 'json')

  expect(result).toMatchSnapshot()
})
