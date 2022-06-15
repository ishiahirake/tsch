/**
 * @see 4260 {@link AllCombinations}.
 */

type Subsequence<T extends any[]> = T extends [infer I, ...infer REST]
  ? [I, ...Subsequence<REST>] | Subsequence<REST>
  : []
