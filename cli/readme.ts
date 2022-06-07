// Project README.md file

import { EOL } from "os"
import { read, write } from "./fs"
import { getWorkingDirPath } from "./path"
import { Statistic } from "./statistic"
import { getQuestions } from "./store"

const README_FILE = "README.md"
const TPL_FILE = "README.tpl.md"

const REPLACE_REGEX = /^:(.*?):$/

export async function updateReadme() {
  const questions = await getQuestions()
  const statistic = new Statistic(questions)

  const replacements: Record<string, string> = {
    "done-questions": statistic.getDoneTable(),
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
