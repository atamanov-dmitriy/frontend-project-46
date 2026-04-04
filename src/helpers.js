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
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load
    case '.json':
      return JSON.parse
    default:
      throw new Error(`Unsupported format: ${extension}`)
  }
}

const checkIsObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

export { readFile, getParser, checkIsObject }
