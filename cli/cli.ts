import { Command } from "commander"
import { TypeChallengesRepo } from "./git/Repo"

const program = new Command()

program.name("tsch").description("CLI utilities to manage type-challenges.").version("0.1.0")

program
  .command("questions")
  .description("list all questions")
  .option("-d, --difficulty <difficulty>", "difficulty of questions")
  .action(questions)

program
  .command("challenge [question]")
  .description("challenge a question")
  .alias("do")
  .option("-d, --difficulty <difficulty>", "difficulty of question")
  .option(
    "-r, --random",
    "challenge question randomly if supplied, otherwise challenge by difficulty order"
  )
  .action(challenge)

program.parse()

//

/**
 * List all questions.
 */
async function questions() {
  const questions = await TypeChallengesRepo.getQuestions()

  for (const question of questions) {
    console.log(question.fullName)
  }
}

/**
 * Challenge a question.
 *
 * options:
 *
 * - difficulty: warm, easy, medium, hard, all
 *
 * @param no
 */
async function challenge(this: Command, no?: string) {
  const difficulty = this.opts().difficulty
  const random = this.opts().random

  const question = await findQuestion({ no, difficulty, random })
  if (!question) {
    console.log("No question found.")
    return
  }

  if (question.isDone()) {
    console.log("Question is already done.")
    return
  }

  await question.prepare()
  console.log(`Question ${question.fullName} is prepared.`)
}

type FindQuestionOptions = {
  no?: string
  difficulty?: string
  random?: boolean
}
async function findQuestion(options?: FindQuestionOptions) {
  const { no, difficulty, random } = options ?? {}

  const questions = await TypeChallengesRepo.getQuestions()
  if (no) {
    return questions.find((v) => v.no === Number(no))
  }

  let filtered = questions.filter((v) => !v.isDone())
  if (filtered.length === 0) {
    return undefined
  }

  if (difficulty) {
    filtered = filtered.filter((v) => v.difficulty === difficulty)
  }

  if (random) {
    return arrayRandom(filtered)
  }

  // Otherwise, find question by difficulty
  filtered.sort((a, b) => a.getDifficultyLevel() - b.getDifficultyLevel())
  return filtered?.[0]
}

function arrayRandom<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined
}
