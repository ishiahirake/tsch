type __RequiredByKeys<T extends object, K> = {
  [P in keyof T as P extends K ? P : never]-?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

// type __Normalize<T extends object> = {
//   [P in keyof T]: T[P]
// }

type RequiredByKeys<T extends object, K = keyof T> = __Normalize<__RequiredByKeys<T, K>>
