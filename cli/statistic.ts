import { getQuestionReadmeRelativePath, getQuestionSolutionRelativePath } from "./path"
import { Question } from "./question"

type DifficultyCountMap = Record<string, number>

type Column = "no" | "difficulty" | "challenge" | "solution"
type RowData<T = string> = Record<Column, T>

type PadDirection = "left" | "right"

const COLUMN_ORDERS: Column[] = ["no", "difficulty", "challenge", "solution"]
const COLUMN_PAD_DIRECTIONS: RowData<PadDirection> = {
  no: "left",
  difficulty: "right",
  challenge: "right",
  solution: "right",
}

export class Statistic {
  private totalQuestionCount = 0
  private totalDifficultyCountMap: DifficultyCountMap = {}

  private doneQuestionCount = 0
  private doneDifficultyCountMap: DifficultyCountMap = {}

  constructor(private readonly questions: Question[]) {}

  analyze() {
    this.totalQuestionCount = this.questions.length

    for (const question of this.questions) {
      const difficulty = question.difficulty

      this.increaseDifficultyCountMap(this.totalDifficultyCountMap, difficulty)

      if (question.done) {
        this.doneQuestionCount += 1
        this.increaseDifficultyCountMap(this.doneDifficultyCountMap, difficulty)
      }
    }
  }

  private increaseDifficultyCountMap(map: DifficultyCountMap, difficulty: string) {
    if (map[difficulty] === undefined) {
      map[difficulty] = 1
    } else {
      map[difficulty] += 1
    }
  }

  getDoneTable(): string {
    const questions = this.questions.filter((q) => q.done).sort((a, b) => a.no - b.no)

    const rows = questions.map<RowData>((q) => {
      return {
        no: `${q.no}`,
        difficulty: q.difficulty,
        challenge: `[${q.name}](${getQuestionReadmeRelativePath(q.fullName)})`,
        solution: `[Solution](${getQuestionSolutionRelativePath(q.fullName)})`,
      }
    })

    const title: RowData = {
      no: "NO",
      difficulty: "Difficulty",
      challenge: "Challenge",
      solution: "Solution",
    }
    const division: RowData = {
      no: "---:",
      difficulty: "-",
      challenge: "-",
      solution: "-",
    }

    // column length no include the front/end 2 space
    const columnMaxLength: RowData<number> = { no: 0, difficulty: 0, challenge: 0, solution: 0 }

    const keys = Object.keys(title) as Column[]
    for (const row of rows.concat(title, division)) {
      for (const key of keys) {
        const keyLength = row[key].length
        if (keyLength > columnMaxLength[key]) {
          columnMaxLength[key] = keyLength
        }
      }
    }

    const table: string[] = [
      this.getRowString(title, columnMaxLength),
      this.getRowString(division, columnMaxLength, "-"),
    ]

    return table.concat(rows.map((row) => this.getRowString(row, columnMaxLength))).join("\n")
  }

  private getRowString(row: RowData, columnLength: RowData<number>, pad = " "): string {
    const sep = "|"

    const content = COLUMN_ORDERS.map(
      (col) => ` ${this.pad(row[col], columnLength[col], COLUMN_PAD_DIRECTIONS[col], pad)} `
    ).join(sep)

    return sep + content + sep
  }

  private pad(str: string, length: number, dir: PadDirection, pad = " ") {
    const count = length - str.length
    if (count <= 0) {
      return str
    }

    const padStr = pad.repeat(count)

    return dir === "left" ? padStr + str : str + padStr
  }
}
