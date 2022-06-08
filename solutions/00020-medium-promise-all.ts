// when T is array, then keyof T return array number keys

declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{
  [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]
}>
