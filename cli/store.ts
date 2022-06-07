import { isFile, read, write } from "./fs"
import { getTree, TreeNode } from "./octokit"
import { getCachePath } from "./path"
import { QuestionLiteral, Question, isSolutionExists } from "./question"
import { arrayRandom, isEmpty } from "./utils"

const QUESTION_CACHE_FILE = "questions.json"

type FindQuestionOptions = {
  no?: string
  difficulty?: string
  random?: boolean
}

export async function findQuestion(options?: FindQuestionOptions) {
  const { no, difficulty, random } = options ?? {}

  const questions = await getQuestions()
  if (no) {
    return questions.find((v) => v.no === Number(no))
  }

  let filtered = questions.filter((v) => !v.done)
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

export async function getQuestions() {
  let questions = getQuestionsFromCache()

  if (isEmpty(questions)) {
    questions = await fetchQuestionsFromGithub()
    if (!isEmpty(questions)) {
      cacheQuestions(questions)
    }
  }

  return questions
}

async function fetchQuestionsFromGithub(sha: string = "main") {
  const root = await getTree(sha)

  const node = root.data.tree.find((v) => v.path === "questions")
  if (!node?.sha) {
    return []
  }

  const tree = await getTree(node.sha)

  return tree.data.tree.map(fromTreeNode).filter((v) => v) as Question[]
}

function getQuestionsFromCache(): Question[] {
  const file = getCachePath(QUESTION_CACHE_FILE)
  if (!isFile(file)) {
    return []
  }

  const content = read(file)
  const data = JSON.parse(content) as QuestionLiteral[]

  return data.map(Question.fromLiteral)
}

function cacheQuestions(questions: Question[]) {
  const content = JSON.stringify(questions.map((q) => q.toLiteral()))
  write(getCachePath(QUESTION_CACHE_FILE), content)
}

function fromTreeNode(node: TreeNode): Question | undefined {
  if (!node.path || !node.sha) {
    return undefined
  }

  return Question.fromLiteral({
    sha: node.sha,
    fullName: node.path,
    done: isSolutionExists(node.path),
  })
}
