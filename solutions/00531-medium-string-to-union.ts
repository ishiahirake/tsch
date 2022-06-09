type StringToUnion<T extends string> = T extends `${infer C}${infer R}`
  ? C | StringToUnion<R>
  : never
