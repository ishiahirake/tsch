type MyCapitalize<S extends string> = S extends `${infer C}${infer REST}`
  ? `${MyUppercase<C>}${REST}`
  : S

// Typescript has build in Uppercase type.
// We can also implement it by the following code
type MyUppercase<T extends string> = T extends keyof CharacterMap ? CharacterMap[T] : T
type CharacterMap = {
  a: "A"
  b: "B"
  c: "C"
  d: "D"
  e: "E"
  f: "F"
  g: "G"
  h: "H"
  i: "I"
  j: "J"
  k: "K"
  l: "L"
  m: "M"
  n: "N"
  o: "O"
  p: "P"
  q: "Q"
  r: "R"
  s: "S"
  t: "T"
  u: "U"
  v: "V"
  w: "W"
  x: "X"
  y: "Y"
  z: "Z"
}
