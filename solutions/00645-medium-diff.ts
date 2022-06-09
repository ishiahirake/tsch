/**
 * For self implemented Exclude, see 43 {@link MyExclude}.
 * here just use built it Exclude.
 */

type Diff<A, B, AK extends keyof A = keyof A, BK extends keyof B = keyof B> = {
  [P in Exclude<AK, BK> | Exclude<BK, AK>]: P extends AK ? A[P] : P extends BK ? B[P] : never
}
