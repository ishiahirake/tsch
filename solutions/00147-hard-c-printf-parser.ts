type ControlsMap = {
  c: "char"
  s: "string"
  d: "dec"
  o: "oct"
  h: "hex"
  f: "float"
  p: "pointer"
}

type ControlsKeys = keyof ControlsMap

type ParsePrintFormat<
  S extends string,
  R extends string[] = []
> = S extends `${infer _A}%${infer C}${infer B}`
  ? C extends ControlsKeys
    ? ParsePrintFormat<B, [...R, ControlsMap[C]]>
    : ParsePrintFormat<B, R>
  : R
