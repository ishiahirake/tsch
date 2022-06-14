type MapTypesMap<F = unknown, T = unknown> = { mapFrom: F; mapTo: T }

type MapTypes<T extends object, M extends MapTypesMap> = {
  [P in keyof T]: T[P] extends M["mapFrom"]
    ? M extends MapTypesMap<T[P]>
      ? M["mapTo"]
      : never
    : T[P]
}
