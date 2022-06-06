type Concat<T extends any[], U extends any[]> = U extends [infer I, ...infer REST]
  ? Concat<[...T, I], REST>
  : T
