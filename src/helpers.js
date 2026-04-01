import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = (filePath, callback) => {
  const absolutePath = path.resolve(process.cwd(), filePath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(filePath)
  const parser = callback(extension)
  const data = parser(content)
  return data
}

const getParser = (extension) => {
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load
  }
  if (extension === '.json') {
    return JSON.parse
  }
  throw new Error(`Unsupported format: ${extension}`)
}

const checkIsObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

export { readFile, getParser, checkIsObject }
