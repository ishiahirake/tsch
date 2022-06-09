type _Kebab<S extends string> = S extends `${infer C}${infer R}`
  ? C extends Lowercase<C>
    ? `${C}${_Kebab<R>}`
    : `-${Lowercase<C>}${_Kebab<R>}`
  : S

type KebabCase<S extends string> = S extends `${infer C}${infer R}`
  ? `${Lowercase<C>}${_Kebab<R>}`
  : S
