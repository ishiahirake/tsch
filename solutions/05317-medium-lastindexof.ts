/**
 * We can use [...infer REST, infer L] to infer last element L of an array.
 */

type LastIndexOfMatch<I, U> = U extends I ? true : false
type LastIndexOfRemoveOne<T extends unknown[]> = T extends [infer _I, ...infer REST] ? REST : never

type LastIndexOf<
  T extends unknown[],
  U,
  P extends unknown[] = LastIndexOfRemoveOne<T>
> = T extends [...infer REST, infer L]
  ? LastIndexOfMatch<L, U> extends true
    ? P["length"]
    : LastIndexOf<REST, U, LastIndexOfRemoveOne<P>>
  : -1
