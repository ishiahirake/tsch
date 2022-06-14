type NumberRange<
  L extends number,
  H extends number,
  N extends unknown[] = [],
  R extends number[] = [],
  F extends boolean = false
> = N["length"] extends H
  ? [...R, H][number]
  : N["length"] extends L
  ? NumberRange<L, H, [...N, unknown], [...R, L], true>
  : F extends true
  ? NumberRange<L, H, [...N, unknown], [...R, N["length"]], F>
  : NumberRange<L, H, [...N, unknown], R, F>
