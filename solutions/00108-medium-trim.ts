// Since we already have TrimLeft (106) and TrimRight (4083),
// we could simplify combine this to get the Trim.
//
// type Trim<S extends string> = TrimLeft<TrimRight<S>>

type WS = " " | "\n" | "\t"
type Trim<S extends string> = S extends `${WS}${infer REST}` | `${infer REST}${WS}` ? Trim<REST> : S
