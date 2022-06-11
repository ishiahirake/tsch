type __BEMConcat<S extends string, C extends string, T> = [T] extends [never]
  ? S
  : T extends string
  ? `${S}${C}${T}`
  : never

type BEM<B extends string, E extends string[], M extends string[]> = __BEMConcat<
  __BEMConcat<B, "__", E[number]>,
  "--",
  M[number]
>
