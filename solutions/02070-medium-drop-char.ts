type DropChar<S extends string, C extends string> = S extends `${infer I}${infer R}`
  ? I extends C
    ? DropChar<R, C>
    : `${I}${DropChar<R, C>}`
  : S
