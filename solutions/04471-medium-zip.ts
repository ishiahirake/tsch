type Zip<T extends unknown[], U extends unknown[], R extends unknown[] = []> = T extends [
  infer TI,
  ...infer TR
]
  ? U extends [infer UI, ...infer UR]
    ? Zip<TR, UR, [...R, [TI, UI]]>
    : R
  : R
