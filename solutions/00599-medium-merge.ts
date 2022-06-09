type Merge<F, S, FK extends keyof F = keyof F, SK extends keyof S = keyof S> = {
  [P in FK | SK]: P extends SK ? S[P] : P extends FK ? F[P] : never
}
