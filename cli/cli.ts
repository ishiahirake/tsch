import { Command } from "commander"
import { findQuestion } from "./store"

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
  // const questions = await TypeChallengesRepo.getQuestions()
  // for (const question of questions) {
  //   console.log(question.fullName)
  // }
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
