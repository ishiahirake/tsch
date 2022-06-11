type Reverse<T extends unknown[]> = T extends [infer I, ...infer REST] ? [...Reverse<REST>, I] : T
