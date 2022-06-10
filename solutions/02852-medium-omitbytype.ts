type OmitByType<T extends object, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}
