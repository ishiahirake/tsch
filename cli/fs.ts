import { dirname } from "path"
import * as fs from "fs"

export function read(file: string): string {
  return fs.readFileSync(file, { encoding: "utf8" })
}

export function write(file: string, content: string) {
  ensureDir(file)
  fs.writeFileSync(file, content)
}

export function ensureDir(file: string) {
  const dir = dirname(file)
  if (!isDir(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
//

export function isFile(file: string): boolean {
  try {
    return fs.statSync(file).isFile()
  } catch (e) {
    return false
  }
}

export function isDir(path: string): boolean {
  try {
    return fs.statSync(path).isDirectory()
  } catch (e) {
    return false
  }
}
