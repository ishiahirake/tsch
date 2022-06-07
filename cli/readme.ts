// Project README.md file
import { difficultyLevels } from "./question"
import { Question } from "./question"

import { EOL } from "os"
import { read, write } from "./fs"
import {
  getQuestionReadmeRelativePath,
  getQuestionSolutionRelativePath,
  getWorkingDirPath,
} from "./path"
import { getQuestions } from "./store"
import { pad, PadDirection, ucfirst } from "./utils"
import { analyze } from "./statistic"

const README_FILE = "README.md"
const TPL_FILE = "README.tpl.md"

const REPLACE_REGEX = /^:(.*?):$/

export async function updateReadme() {
  const questions = await getQuestions()

  const replacements: Record<string, string> = {
    statistic: getStatisticInfo(questions),
    "done-questions": getDoneTable(questions),
  }

  const tpl = read(getWorkingDirPath(TPL_FILE))
  const filledTpl = tpl
    .split(EOL)
    .map((line) => {
      const result = line.match(REPLACE_REGEX)
      return result ? replacements[result[1]] : line
    })
    .join(EOL)

  write(getWorkingDirPath(README_FILE), filledTpl)
}

//

function getStatisticInfo(questions: Question[]): string {
  const statistic = analyze(questions)
  const total =
    getProgressInfo("Total", statistic.doneQuestionCount, statistic.totalQuestionCount) + "  "
  const difficulties = Object.keys(difficultyLevels).sort((l1, l2) => {
    return difficultyLevels[l1] - difficultyLevels[l2]
  })

  const detail = difficulties
    .map((difficulty) => {
      return getProgressInfo(
        difficulty,
        statistic.doneDifficultyCountMap[difficulty],
        statistic.totalDifficultyCountMap[difficulty]
      )
    })
    .join(" | ")

  return [total, detail].join("\n")
}

function getProgressInfo(title: string, current: number, total: number): string {
  const percentage = ((current / total) * 100).toFixed(0) + "%"
  return `${ucfirst(title)}: ${percentage} (${current}/${total})`
}

//

type Column = "no" | "difficulty" | "challenge" | "solution"
type RowData<T = string> = Record<Column, T>

const COLUMN_ORDERS: Column[] = ["no", "difficulty", "challenge", "solution"]
const COLUMN_PAD_DIRECTIONS: RowData<PadDirection> = {
  no: "left",
  difficulty: "right",
  challenge: "right",
  solution: "right",
}

function getDoneTable(questions: Question[]): string {
  questions = questions.filter((q) => q.done).sort((a, b) => a.no - b.no)

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
    getRowString(title, columnMaxLength),
    getRowString(division, columnMaxLength, "-"),
  ]

  return table.concat(rows.map((row) => getRowString(row, columnMaxLength))).join("\n")
}

function getRowString(row: RowData, columnLength: RowData<number>, padStr = " "): string {
  const sep = "|"

  const content = COLUMN_ORDERS.map(
    (col) => ` ${pad(row[col], columnLength[col], COLUMN_PAD_DIRECTIONS[col], padStr)} `
  ).join(sep)

  return sep + content + sep
}
