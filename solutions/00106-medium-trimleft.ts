type TrimLeft<S extends string> = S extends `${infer C}${infer REST}`
  ? C extends " " | "\n" | "\t"
    ? TrimLeft<REST>
    : S
  : S

// The following is more compact
//
// type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer REST}` ? TrimLeft<REST> : S
