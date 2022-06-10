type PercentageParser<A extends string> = A extends `-${infer D}%`
  ? ["-", D, "%"]
  : A extends `+${infer D}%`
  ? ["+", D, "%"]
  : A extends `-${infer D}`
  ? ["-", D, ""]
  : A extends `+${infer D}`
  ? ["+", D, ""]
  : A extends `${infer D}%`
  ? ["", D, "%"]
  : A extends ""
  ? ["", "", ""]
  : ["", A, ""]
