// Is there a way to forbid `U in keyof T`?

type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V
}
