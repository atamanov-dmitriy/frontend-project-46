#!/usr/bin/env node

import { Command } from 'commander'
import { readFile, buildDiff, diffEntryToString } from '../src/utils.js'

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const entry1 = readFile(filePath1)
    const entry2 = readFile(filePath2)
    const diffEntry = buildDiff(entry1, entry2)
    console.log(diffEntryToString(diffEntry))
  })

program.parse(process.argv)
