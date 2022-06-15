type SimpleVueComputedObject<T> = {
  [P in keyof T]: T[P] extends () => infer R ? R : T[P]
}

type SimpleVueMethods<T> = {
  [key: string]: (this: T & SimpleVueMethods<T>) => unknown
}

declare function SimpleVue<
  Data,
  Computed extends Record<string, (this: Data) => unknown>
>(options: {
  data: (this: unknown) => Data
  computed: Computed
  methods: SimpleVueMethods<Data & SimpleVueComputedObject<Computed>>
}): any

/**
 * With ThisType utility type, we can also implements it by following code.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype}
 *
 * @param options
 */
// declare function SimpleVue<D, C, M>(options: {
//   data(this: unknown): D
//   computed: C & ThisType<D>
//   methods: M &
//     ThisType<
//       D &
//         M & {
//           [P in keyof C]: C[P] extends () => infer R ? R : C[P]
//         }
//     >
// }): D & C & M
