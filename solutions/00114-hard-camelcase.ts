type SplitString<
  S extends string,
  C extends string = "_",
  R extends string[] = []
> = S extends `${infer A}${C}${infer B}` ? SplitString<B, C, [...R, A]> : [...R, S]

type UCFist<S extends string> = S extends `${infer C}${infer R}` ? `${Uppercase<C>}${R}` : S
type LCFist<S extends string> = S extends `${infer C}${infer R}` ? `${Lowercase<C>}${R}` : S

type UCFirstLowercaseJoin<SA extends string[], R extends string = ''> = SA extends [infer I extends string, ...infer REST extends string[]] ? UCFirstLowercaseJoin<REST, `${R}${UCFist<Lowercase<I>>}`> : R

type CamelCase<S extends string> = LCFist<UCFirstLowercaseJoin<SplitString<S>>>
