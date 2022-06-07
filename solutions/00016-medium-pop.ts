type Pop<T extends any[]> = T extends [...infer REST, unknown] ? [...REST] : never
