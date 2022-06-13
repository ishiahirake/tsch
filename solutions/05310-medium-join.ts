type Join<T extends string[], U extends number | string, R extends string = ""> = T extends [
  infer I extends string,
  ...infer REST extends string[]
]
  ? REST extends []
    ? `${R}${I}`
    : Join<REST, U, `${R}${I}${U}`>
  : R
