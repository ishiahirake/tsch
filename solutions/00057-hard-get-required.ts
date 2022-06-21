/**
 * @see 4 {@link MyPick}.
 */

type GetRequired<T> = {
  [P in keyof T as IsRequired<T, P> extends true ? P : never]: T[P]
}

type IsRequired<T, K extends keyof T, V = Pick<T, K>> = V extends Required<V> ? true : false
