type FlattenDepth<T extends unknown[], D = 1, C extends unknown[] = []> = T extends [
  infer I,
  ...infer REST
]
  ? I extends unknown[]
    ? C["length"] extends D
      ? [I, ...FlattenDepth<REST>]
      : [...FlattenDepth<I, D, [...C, ""]>, ...FlattenDepth<REST, D, C>]
    : [I, ...FlattenDepth<REST, D, C>]
  : T
