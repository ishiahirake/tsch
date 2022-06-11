/**
 * For Reverse, see 3196.
 */

// type Reverse<T extends unknown[]> = T extends [infer I, ...infer REST] ? [...Reverse<REST>, I] : T

type FlipArguments<F extends Function> = F extends (...args: [...infer A]) => infer R
  ? (...args: [...Reverse<A>]) => R
  : never
