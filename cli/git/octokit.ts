import { Octokit } from "octokit"

const octokit = new Octokit()

const owner = "type-challenges"
const repo = "type-challenges"

export type TreeResponse = Awaited<ReturnType<typeof getTree>>
export type BlobResponse = Awaited<ReturnType<typeof getBlob>>

//

export type TreeNode = {
  path?: string
  mode?: string
  type?: string
  sha?: string
  size?: number
  url?: string
}

export type Blob = BlobResponse["data"]

//

/**
 * @see https://docs.github.com/en/rest/git/trees#get-a-tree
 *
 * @param sha
 */
export function getTree(sha: string) {
  return octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner,
    repo,
    tree_sha: sha,
  })
}

/**
 * @see https://docs.github.com/en/rest/git/blobs#get-a-blob
 *
 * @param sha
 * @returns
 */
export function getBlob(sha: string) {
  return octokit.request("GET /repos/{owner}/{repo}/git/blobs/{file_sha}", {
    owner,
    repo,
    file_sha: sha,
  })
}
