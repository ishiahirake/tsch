/**
 * We can use [...infer REST, infer L] to infer last element L of an array.
 *
 * For IndexOfMatch, see 5153 {@link IndexOfMatch}.
 */

// type IndexOfMatch<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
//   ? true
//   : false

type LastIndexOfRemoveOne<T extends unknown[]> = T extends [infer _I, ...infer REST] ? REST : never

type LastIndexOf<
  T extends unknown[],
  U,
  P extends unknown[] = LastIndexOfRemoveOne<T>
> = T extends [...infer REST, infer L]
  ? IndexOfMatch<L, U> extends true
    ? P["length"]
    : LastIndexOf<REST, U, LastIndexOfRemoveOne<P>>
  : -1
