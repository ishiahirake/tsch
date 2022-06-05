import assert from "assert"
import {
  isSolutionExists,
  makeQuestionDir,
  writeReadmeFile,
  writeSolutionTemplate,
  writeTestCasesFile,
} from "../fs"
import { Blob, getBlob, getTree, TreeNode, TreeResponse } from "./octokit"

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

  private tree?: TreeResponse

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

  static fromTreeNode(node: TreeNode): Question | undefined {
    if (!node.path || !node.sha) {
      return undefined
    }
    return new Question(node.path, node.sha)
  }

  //

  isDone(): boolean {
    return isSolutionExists(this.fullName)
  }

  getDifficultyLevel(): number {
    return difficultyLevels[this.difficulty] ?? difficultyLevels["extreme"]
  }

  /**
   * Prepare a question for the challenge.
   *
   * Do following:
   *
   * 1. create a file named `${this.fullName}.ts` in the `solutions` directory
   * 2. create a directory named `${this.fullName}` in the `questions` directory
   * 3. download README.md to question directory
   * 4. download test-cases.ts to question directory
   */
  async prepare() {
    await this.ensureTree()

    // 1. template.ts
    const template = await this.getTemplate()
    if (!template) {
      console.log("No template found.")
    } else {
      writeSolutionTemplate(this.fullName, this.decodeBlobContent(template))
    }

    // 2. question directory
    makeQuestionDir(this.fullName)

    // 3. README.md
    const readme = await this.getReadme()
    if (!readme) {
      console.log("No README.md found.")
    } else {
      writeReadmeFile(this.fullName, this.decodeBlobContent(readme))
    }

    // 4. test-cases.ts
    const testCases = await this.getTestCases()
    if (!testCases) {
      console.log("No test-cases.ts found.")
    } else {
      writeTestCasesFile(this.fullName, this.decodeBlobContent(testCases))
    }
  }

  //

  private async ensureTree() {
    if (!this.tree) {
      this.tree = await getTree(this.sha)
    }
  }

  private async getTemplate(): Promise<Blob | undefined> {
    assert(this.tree, "tree is not initialized")

    const template = this.tree.data.tree.find((v) => v.path === "template.ts")
    if (!template?.sha) {
      return undefined
    }

    const blob = await getBlob(template.sha)
    return blob.data
  }

  private async getReadme(): Promise<Blob | undefined> {
    assert(this.tree, "tree is not initialized")

    const readme = this.tree.data.tree.find((v) => v.path === "README.md")
    if (!readme?.sha) {
      return undefined
    }

    const blob = await getBlob(readme.sha)
    return blob.data
  }

  private async getTestCases(): Promise<Blob | undefined> {
    assert(this.tree, "tree is not initialized")

    const testCases = this.tree.data.tree.find((v) => v.path === "test-cases.ts")
    if (!testCases?.sha) {
      return undefined
    }

    const blob = await getBlob(testCases.sha)
    return blob.data
  }

  private decodeBlobContent(blob: Blob): string {
    if (blob.encoding === "base64") {
      return Buffer.from(blob.content, "base64").toString()
    }

    throw new Error(`Unsupported encoding: ${blob.encoding}`)
  }
}

function ucfirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
