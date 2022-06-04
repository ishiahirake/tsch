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
async function challenge(no?: string) {
  const difficulty = program.opts().difficulty

  const question = await findQuestion(no, difficulty)
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

async function findQuestion(no?: string, difficulty?: string) {
  const questions = await TypeChallengesRepo.getQuestions()
  if (no) {
    return questions.find((v) => v.no === Number(no))
  }

  let filtered = questions
  if (difficulty) {
    filtered = questions.filter((v) => v.difficulty === difficulty)
  }

  return filtered[Math.floor(Math.random() * filtered.length)]
}
