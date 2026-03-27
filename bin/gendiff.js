#!/usr/bin/env node

import { Command } from "commander";
import readFile from "../src/utils.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .argument("<filepath1>", "path to first file")
  .argument("<filepath2>", "path to second file")
  .option("-f, --format [type]", "output format", "stylish")
  .action((filePath1, filePath2) => {
    console.log(readFile(filePath1));
    console.log(readFile(filePath2));
  });

program.parse(process.argv);
