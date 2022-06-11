type Flip<T extends Record<string, any>> = {
  [P in keyof T as T[P] extends true ? "true" : T[P] extends false ? "false" : T[P]]: P
}
