type Unique<T extends any[], R extends unknown[] = []> = T extends [infer I, ...infer REST]
  ? IndexOf<R, I> extends -1
    ? Unique<REST, [...R, I]>
    : Unique<REST, R>
  : R
