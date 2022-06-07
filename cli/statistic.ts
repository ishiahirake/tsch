import { difficultyLevels, Question } from "./question"

type DifficultyCountMap = Record<string, number>

type Statistic = {
  totalQuestionCount: number
  totalDifficultyCountMap: DifficultyCountMap

  doneQuestionCount: number
  doneDifficultyCountMap: DifficultyCountMap
}

export function analyze(questions: Question[]): Readonly<Statistic> {
  const totalQuestionCount = questions.length

  const totalDifficultyCountMap = makeDifficultyCountMap()

  let doneQuestionCount = 0
  const doneDifficultyCountMap = makeDifficultyCountMap()

  for (const question of questions) {
    const difficulty = question.difficulty

    increaseDifficultyCountMap(totalDifficultyCountMap, difficulty)

    if (question.done) {
      doneQuestionCount += 1
      increaseDifficultyCountMap(doneDifficultyCountMap, difficulty)
    }
  }

  return {
    totalQuestionCount,
    totalDifficultyCountMap,
    doneQuestionCount,
    doneDifficultyCountMap,
  }
}

function makeDifficultyCountMap(): DifficultyCountMap {
  return Object.keys(difficultyLevels).reduce((map, difficulty) => {
    map[difficulty] = 0
    return map
  }, {} as DifficultyCountMap)
}

function increaseDifficultyCountMap(map: DifficultyCountMap, difficulty: string) {
  if (map[difficulty] === undefined) {
    map[difficulty] = 1
  } else {
    map[difficulty] += 1
  }
}
