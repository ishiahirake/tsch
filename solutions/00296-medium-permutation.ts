// When conditional types act on a generic type,
// they become distributive when given a union type.
// To avoid it, we should use `[T] extends [never]` instead.
//
// @ses https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

type Permutation<T, O = T> = [T] extends [never]
  ? []
  : T extends unknown
  ? [T, ...Permutation<Exclude<O, T>>]
  : never
