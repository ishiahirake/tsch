type LookUp<T extends { type: string }, U extends T["type"]> = T extends { type: U } ? T : never
