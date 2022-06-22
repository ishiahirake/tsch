/**
 * For GetOptional, @see 59 {@link GetOptional}.
 */

// // type IsRequired<T, K extends keyof T, V = Pick<T, K>> = V extends Required<V> ? true : false

// type GetOptional<T> = {
//   [P in keyof T as IsRequired<T, P> extends false ? P : never]: T[P]
// }

type OptionalKeys<T> = keyof GetOptional<T>
