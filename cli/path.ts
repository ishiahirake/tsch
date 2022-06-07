import { sep } from "path"

const workingDir = process.cwd()

export function getWorkingDirPath(file?: string): string {
  return file ? [workingDir, file].join(sep) : workingDir
}

export function getSolutionPath(question?: string): string {
  let paths = [workingDir, "solutions"]
  if (question) {
    paths.push(`${question}.ts`)
  }
  return paths.join(sep)
}

export function getQuestionPath(question: string, file?: string): string {
  const paths = [workingDir, "questions", question]
  if (file) {
    paths.push(file)
  }
  return paths.join(sep)
}

export function getCachePath(file?: string): string {
  const paths = [workingDir, ".tsch"]
  if (file) {
    paths.push(file)
  }
  return paths.join(sep)
}

export function getQuestionReadmeRelativePath(question: string): string {
  return [".", "questions", question, "README.md"].join("/")
}

export function getQuestionSolutionRelativePath(question: string): string {
  return [".", "solutions", `${question}.ts`].join("/")
}
