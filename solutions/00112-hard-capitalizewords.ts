type CapitalizeWords<S extends string, U = true> = S extends `${infer C}${infer R}`
  ? IsWordChar<C> extends true
    ? U extends true
      ? `${Capitalize<C>}${CapitalizeWords<R, false>}`
      : `${C}${CapitalizeWords<R, U>}`
    : `${C}${CapitalizeWords<R, true>}`
  : S

type LowerCase = StringToUnion<"abcdefghijklmnopqrstuvwxyz">
type UpperCase = StringToUnion<"ABCDEFGHIJKLMNOPQRSTUVWXYZ">
type WordChars = LowerCase | UpperCase
type IsWordChar<C extends string> = C extends WordChars ? true : false

/**
 * The following code make the longest test case passed.
 * @see {@link https://github.com/type-challenges/type-challenges/issues/11221}.
 */

type test = CapitalizeWords<"🤣qq">
