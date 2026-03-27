import fs from "fs";
import path from "path";

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, "utf-8");
  const data = JSON.parse(content);
  return data;
};

export default readFile;
