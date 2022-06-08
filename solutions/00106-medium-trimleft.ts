type TrimLeft<S extends string> = S extends `${infer C}${infer REST}`
  ? C extends " " | "\n" | "\t"
    ? TrimLeft<REST>
    : S
  : S
