type MyOmitExclude<T, U> = T extends U ? never : T

type MyOmit<T, K extends keyof T> = {
  [P in MyOmitExclude<keyof T, K>]: T[P]
}
