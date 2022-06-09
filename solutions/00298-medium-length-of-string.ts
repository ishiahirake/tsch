type LengthOfString<
  S extends string,
  T extends unknown[] = []
> = S extends `${infer C}${infer REST}` ? LengthOfString<REST, [...T, C]> : T["length"]
