type __AB<S extends string, O extends string = S> = S extends O
  ? Exclude<O, S> extends never
    ? S
    : `${S}${__AB<Exclude<O, S>>}` | __AB<Exclude<O, S>>
  : ""

type AllCombinations<S extends string> = "" | __AB<StringToUnion<S>>
