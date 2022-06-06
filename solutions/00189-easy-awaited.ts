// to pass the test cases, the code following should work.
// but for this problem, recursion may be the better.
//
// type MyAwaited<T extends Promise<any>> = T extends Promise<infer R1>
//   ? R1 extends Promise<infer R2>
//     ? R2
//     : R1
//   : never

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R extends Promise<unknown>
    ? MyAwaited<R>
    : R
  : never
