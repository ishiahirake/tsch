type ReplaceKeys<U, T, Y> = U extends object
  ? {
      [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P]
    }
  : never
