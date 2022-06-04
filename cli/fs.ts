import { sep } from "path"
import * as fs from "fs"

const workingDir = process.cwd()

export function getSolutionPath(question?: string): string {
  let paths = [workingDir, "solutions"]
  if (question) {
    paths.push(`${question}.ts`)
  }
  return paths.join(sep)
}

export function isSolutionExists(question: string) {
  return isFileExists(getSolutionPath(question))
}

export function writeSolutionTemplate(question: string, template: string) {
  const path = getSolutionPath(question)
  fs.writeFileSync(path, template)
}

export function getQuestionPath(question: string, file?: string): string {
  const paths = [workingDir, "questions", question]
  if (file) {
    paths.push(file)
  }
  return paths.join(sep)
}

export function makeQuestionDir(question: string) {
  const path = getQuestionPath(question)
  fs.mkdirSync(path, { recursive: true })
}

export function writeReadmeFile(question: string, content: string, filename = "README.md") {
  const path = getQuestionPath(question, filename)
  fs.writeFileSync(path, content)
}

export function writeTestCasesFile(question: string, content: string, filename = "test-cases.ts") {
  const path = getQuestionPath(question, filename)
  fs.writeFileSync(path, content)
}

//

function isFileExists(file: string): boolean {
  try {
    return fs.statSync(file).isFile()
  } catch (e) {
    return false
  }
}
