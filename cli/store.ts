import { getTree, TreeNode } from "./octokit"
import { Question } from "./question"
import { arrayRandom } from "./utils"

type FindQuestionOptions = {
  no?: string
  difficulty?: string
  random?: boolean
}

export async function findQuestion(options?: FindQuestionOptions) {
  const { no, difficulty, random } = options ?? {}

  const questions = await fetchQuestionsFromGithub()
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

async function fetchQuestionsFromGithub(sha: string = "main") {
  const root = await getTree(sha)

  const node = root.data.tree.find((v) => v.path === "questions")
  if (!node?.sha) {
    return []
  }

  const tree = await getTree(node.sha)

  return tree.data.tree.map(fromTreeNode).filter((v) => v) as Question[]
}

function fromTreeNode(node: TreeNode): Question | undefined {
  if (!node.path || !node.sha) {
    return undefined
  }
  return new Question(node.path, node.sha)
}
