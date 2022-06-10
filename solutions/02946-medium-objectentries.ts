type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>

type ObjectEntries<T, K = keyof T> = K extends keyof T ? [K, RemoveUndefined<T[K]>] : never
