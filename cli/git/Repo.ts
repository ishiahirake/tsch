import { getTree } from "./octokit"
import { Question } from "./Question"

class Repo {
  async getQuestions(sha: string = "main"): Promise<Question[]> {
    const root = await getTree(sha)

    const node = root.data.tree.find((v) => v.path === "questions")
    if (!node?.sha) {
      return []
    }

    const tree = await getTree(node.sha)

    return tree.data.tree.map(Question.fromTreeNode).filter((v) => v) as Question[]
  }
}

export const TypeChallengesRepo = new Repo()
