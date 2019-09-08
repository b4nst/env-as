import { type } from 'os'

export interface TypeMap {
  integer: number
  float: number
  boolean: boolean
  string: string
  array: string[]
}

export type Parser<T> = (value: string | undefined, def: T) => T
