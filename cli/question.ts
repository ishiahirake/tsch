import { exec } from "child_process"
import { isSolutionExists, writeReadmeFile, writeSolutionTemplate, writeTestCasesFile } from "./fs"
import { decode, getBlob, getTree, TreeResponse } from "./octokit"
import { ucfirst } from "./utils"

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

  constructor(public readonly fullName: string, public readonly sha: string) {
    const [no, difficulty, name] = this.parseFullName(fullName)
    this.no = no
    this.difficulty = difficulty
    this.name = name
  }

  parseFullName(fullName: string): [number, string, string] {
    const [no, difficulty, label] = fullName.split("-")

    const name = label.split("-").map(ucfirst).join(" ")

    return [Number(no), difficulty, name]
  }

  //

  isDone = () => isDone(this)
  prepare = () => prepare(this)

  getDifficultyLevel(): number {
    return difficultyLevels[this.difficulty] ?? difficultyLevels["extreme"]
  }
}

export function isDone(question: Question) {
  return isSolutionExists(question.fullName)
}

/**
 * Prepare a question for the challenge.
 *
 * Do following:
 *
 * 1. create a file named `${this.fullName}.ts` in the `solutions` directory
 *
 * (create a directory named `${this.fullName}` in the `questions` directory)
 * 2. download README.md to question directory
 * 3. download test-cases.ts to question directory
 *
 * 4. create a git branch for the question
 */
export async function prepare(question: Question) {
  const tree = await getTree(question.sha)

  prepareTemplate(question, tree)
  prepareReadme(question, tree)
  prepareTestCases(question, tree)
  prepareGitBranch(question, tree)
}

//

type PrepareQuestion = (question: Question, tree: TreeResponse) => void

const prepareTemplate: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  const node = tree.data.tree.find((v) => v.path === "template.ts")
  if (!node?.sha) {
    return
  }

  const template = await getBlob(node.sha)

  if (!template.data) {
    console.log("No template found.")
  } else {
    writeSolutionTemplate(question.fullName, decode(template.data))
  }
}

const prepareReadme: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  const node = tree.data.tree.find((v) => v.path === "README.md")
  if (!node?.sha) {
    return
  }

  const readme = await getBlob(node.sha)
  if (!readme.data) {
    console.log("No README.md found.")
  } else {
    writeReadmeFile(question.fullName, decode(readme.data))
  }
}

const prepareTestCases: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  const node = tree.data.tree.find((v) => v.path === "test-cases.ts")
  if (!node?.sha) {
    return
  }

  const testCases = await getBlob(node.sha)
  if (!testCases.data) {
    console.log("No test-cases.ts found.")
  } else {
    writeTestCasesFile(question.fullName, decode(testCases.data))
  }
}

const prepareGitBranch: PrepareQuestion = async (question: Question, tree: TreeResponse) => {
  exec("git status -s", (error, stdout, stderr) => {
    if (error) {
      console.log("prepare git branch error: ", error)
      return
    }

    // git working tree is clean
    if (stdout.trim().length === 0) {
      exec(`git checkout -b feature/${question.fullName}`, (ce, cout, cee) => {
        if (ce) {
          console.error("checkout branch error, make sure working tree is clean", ce, cee)
        }
      })
      return
    }
  })
}
