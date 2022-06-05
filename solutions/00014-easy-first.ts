type First<T extends any[]> = T extends [infer I, ...infer _Rest] ? I : never
