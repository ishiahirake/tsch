type __IsAny<T> = T extends { __my_key_for_test_any: "" } ? true : false

type IsAny<T> = __IsAny<T> extends false ? false : true

// OR
// type IsAny<T> = 0 extends 1 & T ? true : false
