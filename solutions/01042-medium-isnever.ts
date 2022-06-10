/**
 * never is treated as an empty union,
 * since there are no members in this union and thus the result is never.
 *
 * we can use `[T]` to avoid that behavior.
 *
 * @link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
 * @link https://github.com/type-challenges/type-challenges/issues/10760
 */

type IsNever<T> = [T] extends [never] ? true : false
