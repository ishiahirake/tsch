declare function VueBasicProps<P, D, C, M>(options: {
  props: P
  data(this: PropsAsThis<P>): D
  computed: C & ThisType<D & PropsAsThis<P>>
  methods: M &
    ThisType<
      D &
        M & {
          [P in keyof C]: C[P] extends () => infer R ? R : C[P]
        } & PropsAsThis<P>
    >
}): P & D & C & M

type PropsAsThis<T> = {
  [P in keyof T]: CastPropsType<PropsType<T[P]>>
}

type PropsType<T> = T extends { type: infer Type }
  ? Type extends unknown[]
    ? Type[number]
    : Type
  : {} extends T
  ? any
  : T

type CastPropsType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : T extends new (...args: any) => unknown
  ? InstanceType<T>
  : T
