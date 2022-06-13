type Fill<
  T extends unknown[],
  N,
  S extends number = 0,
  E extends number = T["length"],
  R extends unknown[] = [],
  F extends boolean = false
> = T extends [infer I, ...infer REST]
  ? R["length"] extends E
    ? Fill<REST, N, S, E, [...R, I], false>
    : R["length"] extends S
    ? Fill<REST, N, S, E, [...R, N], true>
    : F extends true
    ? Fill<REST, N, S, E, [...R, N], F>
    : Fill<REST, N, S, E, [...R, I], F>
  : R
