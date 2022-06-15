type __Currying<F extends Function> = F extends (i: infer I, ...args: [...infer O]) => infer R
  ? (arg: I) => O extends [] ? R : __Currying<(...args: [...O]) => R>
  : F

declare function Currying<F extends Function>(fn: F): __Currying<F>
