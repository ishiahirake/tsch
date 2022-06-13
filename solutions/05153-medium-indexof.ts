type IndexOfMatch<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type IndexOf<T extends unknown[], U, P extends unknown[] = []> = T extends [infer I, ...infer REST]
  ? MyIncludesEqual<I, U> extends true
    ? P["length"]
    : IndexOf<REST, U, [...P, ""]>
  : -1
