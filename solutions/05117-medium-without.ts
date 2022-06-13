type Without<T extends unknown[], U, R extends unknown[] = []> = T extends [infer I, ...infer REST]
  ? U extends unknown[]
    ? I extends U[number]
      ? Without<REST, U, R>
      : Without<REST, U, [...R, I]>
    : I extends U
    ? Without<REST, U, R>
    : Without<REST, U, [...R, I]>
  : R
