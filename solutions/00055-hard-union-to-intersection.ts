/**
 * multiple candidates for the same type variable in contra-variant positions
 * causes an intersection type to be inferred.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types}
 *
 * Covariance and Contravariance in Typescript
 * @see {@link https://www.jihadwaspada.com/post/covariance-and-contravariance-in-typescript}
 */

type UnionToIntersection<U> = (U extends unknown ? (a: U) => unknown : never) extends (
  a: infer T
) => unknown
  ? T
  : never
