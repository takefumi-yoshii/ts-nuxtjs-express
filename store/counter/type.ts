// ______________________________________________________
//
export interface S {
  count: number
}
// ______________________________________________________
//
export interface G {
  double: number
  expo2: number
  expo: (amount: number) => number
}
export interface RG {
  'counter/double': G['double']
  'counter/expo2': G['expo2']
  'counter/expo': G['expo']
}
// ______________________________________________________
//
export interface M {
  setCount: { amount: number }
  multi: number
  increment: unknown
  decrement: unknown
}
export interface RM {
  'counter/setCount': M['setCount']
  'counter/multi': M['multi']
  'counter/increment': M['increment']
  'counter/decrement': M['decrement']
}
// ______________________________________________________
//
export interface A {
  asyncSetCount: { amount: number }
  asyncMulti: number
  asyncIncrement: unknown
  asyncDecrement: unknown
}
export interface RA {
  'counter/asyncSetCount': A['asyncSetCount']
  'counter/asyncMulti': A['asyncMulti']
  'counter/asyncIncrement': A['asyncIncrement']
  'counter/asyncDecrement': A['asyncDecrement']
}
