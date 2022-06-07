export function arrayRandom<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[Math.floor(Math.random() * array.length)] : undefined
}

export function ucfirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
