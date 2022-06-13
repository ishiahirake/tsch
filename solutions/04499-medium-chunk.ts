type Chunk<
  T extends unknown[],
  S extends number,
  R extends unknown[] = [],
  C extends unknown[] = []
> = T extends [infer I, ...infer REST]
  ? S extends [...C, I]["length"]
    ? Chunk<REST, S, [...R, [...C, I]], []>
    : Chunk<REST, S, R, [...C, I]>
  : C extends []
  ? R
  : [...R, C]
