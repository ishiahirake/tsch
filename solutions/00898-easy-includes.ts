// Explanation for equal:
// https://stackoverflow.com/a/68963796/2248242
type MyIncludesEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type Includes<T extends readonly any[], U> = T extends [infer I, ...infer Rest]
  ? MyIncludesEqual<I, U> extends true
    ? true
    : Includes<Rest, U>
  : false
