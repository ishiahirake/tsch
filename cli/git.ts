import { exec } from "child_process"

export function isWorkingDirClean(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec("git status -s", { cwd: path }, (error, stdout, _stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout.trim().length === 0)
      }
    })
  })
}

export async function isGitRepo(path: string): Promise<boolean> {
  try {
    await isWorkingDirClean(path)
    return true
  } catch {
    return false
  }
}

export async function checkout(branch: string) {
  return new Promise<void>((resolve, reject) => {
    exec(`git checkout -b ${branch}`, {}, (error, _stdout, _stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
