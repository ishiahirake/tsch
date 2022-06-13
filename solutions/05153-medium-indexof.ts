type IndexOfMatch<I, U> = U extends I ? true : false

type IndexOf<T extends unknown[], U, P extends unknown[] = []> = T extends [infer I, ...infer REST]
  ? IndexOfMatch<I, U> extends true
    ? P["length"]
    : IndexOf<REST, U, [...P, ""]>
  : -1
