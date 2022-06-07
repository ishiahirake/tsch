import { sep } from "path"

const workingDir = process.cwd()

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
  return [".", "questions", question, "README.md"].join(sep)
}

export function getQuestionSolutionRelativePath(question: string): string {
  return [".", "solutions", `${question}.ts`].join(sep)
}
