type IsUnion<T, O = T> = T extends unknown ? (Exclude<O, T> extends never ? false : true) : false
