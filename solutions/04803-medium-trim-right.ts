type TrimRight<S extends string> = S extends `${infer C}${infer REST}`
  ? TrimRight<REST> extends ""
    ? C extends " " | "\n" | "\t"
      ? ""
      : C
    : `${C}${TrimRight<REST>}`
  : S

// The following is more compact and better
//
// type TrimRight<S extends string> = S extends `${infer V}${" " | "\n" | "\t"}` ? TrimRight<V> : S
