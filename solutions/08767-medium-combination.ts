/**
 * @see 10   {@link TupleToUnion}
 * @see 4260 {@link AllCombinations}
 */

type __C<S extends string, O extends string = S> = S extends O
  ? Exclude<O, S> extends never
    ? S
    : `${S} ${__C<Exclude<O, S>>}` | __C<Exclude<O, S>>
  : ""

type Combination<T extends string[]> = __C<T[number]>
