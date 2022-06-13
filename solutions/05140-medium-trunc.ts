type Trunc<T extends number | string> = `${T}` extends `${infer N}.${infer _R}` ? N : `${T}`
