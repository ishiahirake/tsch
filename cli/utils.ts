export function isEmpty(array: unknown[]): boolean {
  return array.length === 0
}

export function arrayRandom<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined
}

export function ucfirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export type PadDirection = "left" | "right"

export function pad(str: string, length: number, dir: PadDirection, pad = " ") {
  const count = length - str.length
  if (count <= 0) {
    return str
  }

  const padStr = pad.repeat(count)

  return dir === "left" ? padStr + str : str + padStr
}
