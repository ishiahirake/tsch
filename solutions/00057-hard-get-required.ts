/**
 * @see 4 {@link MyPick}.
 */

type GetRequired<T> = {
  [P in keyof T as IsOptional<T, P> extends true ? P : never]: T[P]
}

type IsOptional<T, K extends keyof T, V = Pick<T, K>> = V extends Required<V> ? true : false
