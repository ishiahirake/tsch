/**
 * Use Record<any, never> to exact match `{}` literal.
 */

// type Falsy = 0 | "" | false | [] | Record<any, never> | null | undefined
// type AnyOf<T extends readonly any[]> = T extends [infer I, ...infer R]
//   ? I extends Falsy
//     ? AnyOf<R>
//     : true
//   : false

// Beside recursion, we can also use T[number] to iterate array's item.
//
type Falsy = 0 | "" | false | [] | Record<any, never> | null | undefined
type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true
