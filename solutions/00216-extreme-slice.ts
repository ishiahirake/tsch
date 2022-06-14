type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = SlicePositive<Arr, SliceGetPositiveIndex<Arr, Start>, SliceGetPositiveIndex<Arr, End>>

/**
 * We can simply come out this only work for positive idx version (if we have done 4518 {@link Fill}).
 *
 * So the problem change to how we can convert negative idx to it's corresponding positive one.
 * And obviously, we can calculate positive idx according to rule:
 *
 * [PosIdx] = [Length of Arr] - [(negative) Idx] * -1.
 */
type SlicePositive<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"],
  Num extends unknown[] = [],
  Result extends unknown[] = [],
  Flag extends boolean = false
> = Arr extends [infer I, ...infer REST]
  ? SliceIsLength<Num, End> extends true
    ? Result
    : SliceIsLength<Num, Start> extends true
    ? SlicePositive<REST, Start, End, [...Num, I], [...Result, I], true>
    : Flag extends true
    ? SlicePositive<REST, Start, End, [...Num, I], [...Result, I], Flag>
    : SlicePositive<REST, Start, End, [...Num, I], Result, Flag>
  : Result

type SliceIndex = number | string

/**
 * Check the length of Arr is Length.
 */
type SliceIsLength<
  Arr extends unknown[],
  Length extends SliceIndex
> = `${Arr["length"]}` extends `${Length}` ? true : false

/**
 * Check T is negative value or not.
 */
type SliceIsNegative<T extends SliceIndex> = `${T}` extends `-${infer _V}` ? true : false

/**
 * Convert T to positive value (if it is negative).
 */
type SliceToPositive<T extends SliceIndex> = `${T}` extends `-${infer V}` ? V : T

/**
 * Get the given Idx 's corresponding positive index on Arr.
 */
type SliceGetPositiveIndex<
  Arr extends unknown[],
  Idx extends number
> = SliceIsNegative<Idx> extends true ? SliceNegativeIndexToPositive<[...Arr], Idx> : Idx

/**
 * Convert the given negative Idx 's corresponding positive index on Arr.
 */
type SliceNegativeIndexToPositive<
  Arr extends unknown[],
  Idx extends SliceIndex,
  Num extends unknown[] = [],
  RIdx extends SliceIndex = SliceToPositive<Idx>
> = Arr extends [infer I, ...infer REST]
  ? SliceIsLength<Num, RIdx> extends true
    ? Arr["length"]
    : SliceNegativeIndexToPositive<REST, Idx, [...Num, I], RIdx>
  : 0
