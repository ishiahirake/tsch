type Shift<T extends unknown[]> = T extends [infer _I, ...infer REST] ? REST : never
