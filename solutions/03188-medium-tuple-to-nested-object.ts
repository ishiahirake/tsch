type TupleToNestedObject<T extends string[], U> = T extends [infer I extends string, ...infer REST extends string[]]
  ? { [P in I]: TupleToNestedObject<REST, U> }
  : U
