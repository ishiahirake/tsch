type GreaterThan<
  T extends number,
  U extends number,
  A extends unknown[] = []
> = A["length"] extends U
  ? A["length"] extends T
    ? false
    : true
  : A["length"] extends T
  ? false
  : GreaterThan<T, U, [...A, ""]>
