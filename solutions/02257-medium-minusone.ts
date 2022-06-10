/**
 * It seems that the max recursion times is 999,
 * so to pass test case MinusOne<1101>,
 * we should push at least 2 elements in one recursion operation.
 */

type MinusOne<T extends number, A extends unknown[] = []> = [...A, ""]["length"] extends T
  ? A["length"]
  : [...A, "", ""]["length"] extends T
  ? [...A, ""]["length"]
  : MinusOne<T, [...A, "", ""]>
