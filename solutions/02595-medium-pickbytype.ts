type PickByType<T extends object, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
