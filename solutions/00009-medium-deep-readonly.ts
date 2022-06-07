// Primitives types are: string, number, boolean
// @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
//
// Beside the primitives, the Function type is also needed.

type DeepReadonly<T> = T extends string | number | boolean | Function
  ? T
  : {
      readonly [P in keyof T]: DeepReadonly<T[P]>
    }
