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
