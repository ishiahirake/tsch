type Concat<T extends unknown[], U extends unknown[]> = U extends [infer I, ...infer REST]
  ? Concat<[...T, I], REST>
  : T

// This should be more compact and better
//
// type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
