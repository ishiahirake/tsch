type Last<T extends any[]> = T extends [infer I, ...infer REST]
  ? REST extends []
    ? I
    : Last<REST>
  : never

// The following is more compact and better.
//
// @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
//
// type Last<T extends any[]> = T extends [...infer _R, infer L] ? L : never
