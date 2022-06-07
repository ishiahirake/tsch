import { isFile, write } from "./fs"
import { checkout, isGitRepo } from "./git"
import { decode, getBlob, getTree, TreeResponse } from "./octokit"
import { getQuestionPath, getSolutionPath, getWorkingDirPath } from "./path"
import { updateReadme } from "./readme"
import { doneQuestion } from "./store"
import { ucfirst } from "./utils"

export type QuestionLiteral = {
  sha: string
  fullName: string
  done: boolean
}

const difficultyLevels: Record<string, number> = {
  warm: 1,
  easy: 2,
  medium: 3,
  hard: 4,
  extreme: 5,
}

export class Question {
  readonly no: number
  readonly difficulty: string
  readonly name: string

  constructor(
    public readonly fullName: string,
    public readonly sha: string,
    public readonly done: boolean
  ) {
    const [no, difficulty, name] = this.parseFullName(fullName)
    this.no = no
    this.difficulty = difficulty
    this.name = name
  }

  static fromLiteral(literal: QuestionLiteral) {
    return new Question(literal.fullName, literal.sha, literal.done)
  }

  parseFullName(fullName: string): [number, string, string] {
    const [no, difficulty, ...labels] = fullName.split("-")

    const name = labels.map(ucfirst).join(" ")

    return [Number(no), difficulty, name]
  }

  //

  prepare = () => prepare(this)

  getDifficultyLevel(): number {
    return difficultyLevels[this.difficulty] ?? difficultyLevels["extreme"]
  }

  toLiteral(): QuestionLiteral {
    return { fullName: this.fullName, sha: this.sha, done: this.done }
  }
}

export function isSolutionExists(fullName: string) {
  return isFile(getSolutionPath(fullName))
}

/**
 * Prepare a question for the challenge.
 *
 * Do following:
 *
 * 1. create a git branch for the question
 *
 * 2. create a file named `${this.fullName}.ts` in the `solutions` directory
 *
 * (create a directory named `${this.fullName}` in the `questions` directory)
 * 3. download README.md to question directory
 * 4. download test-cases.ts to question directory
 *
 * 5. update project README.md.
 *
 */
export async function prepare(question: Question) {
  const tree = await getTree(question.sha)

  doneQuestion(question)

  await prepareQuestionGitBranch(question, tree)

  await prepareSolutionTemplate(question, tree)
  await prepareQuestionReadme(question, tree)
  await prepareQuestionTestCases(question, tree)

  await prepareProjectReadme(question, tree)
}

//

type PrepareQuestion = (question: Question, tree: TreeResponse) => Promise<void>

const prepareSolutionTemplate: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  const node = tree.data.tree.find((v) => v.path === "template.ts")
  if (!node?.sha) {
    return
  }

  const template = await getBlob(node.sha)

  if (!template.data) {
    console.log("No template found.")
  } else {
    write(getSolutionPath(question.fullName), decode(template.data))
  }
}

const prepareQuestionReadme: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  const node = tree.data.tree.find((v) => v.path === "README.md")
  if (!node?.sha) {
    return
  }

  const readme = await getBlob(node.sha)
  if (!readme.data) {
    console.log("No README.md found.")
  } else {
    const file = getQuestionPath(question.fullName, "README.md")
    write(file, decode(readme.data))
  }
}

const prepareQuestionTestCases: PrepareQuestion = async (
  question: Question,
  tree: TreeResponse
) => {
  const node = tree.data.tree.find((v) => v.path === "test-cases.ts")
  if (!node?.sha) {
    return
  }

  const testCases = await getBlob(node.sha)
  if (!testCases.data) {
    console.log("No test-cases.ts found.")
  } else {
    const file = getQuestionPath(question.fullName, "test-cases.ts")
    write(file, decode(testCases.data))
  }
}

const prepareQuestionGitBranch: PrepareQuestion = async (question: Question) => {
  const cwd = getWorkingDirPath()

  const isGit = await isGitRepo(cwd)
  if (!isGit) {
    return
  }

  try {
    await checkout(`feature/${question.fullName}`)
  } catch (e) {
    console.error("checkout branch error, make sure working tree is clean")
  }
}

const prepareProjectReadme: PrepareQuestion = async () => {
  updateReadme()
}
