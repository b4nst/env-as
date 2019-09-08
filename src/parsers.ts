import { Parser } from './types'

export const string: Parser<string> = (
  v: string | undefined,
  def: string = ''
) => (v ? String(v) : def)

export const integer: Parser<number> = (
  v: string | undefined,
  def: number = 0
) => (v ? (isNaN(parseInt(v, 10)) ? def : parseInt(v, 10)) : def)

export const float: Parser<number> = (v: string | undefined, def: number = 0) =>
  v ? (isNaN(parseFloat(v)) ? def : parseFloat(v)) : def

export const boolean: Parser<boolean> = (
  v: string | undefined,
  def: boolean = false
) => /^(true|yes)$/gim.test(v || '') || def

export const array: Parser<string[]> = (
  v: string | undefined,
  def: string[] = []
) => (v ? v.split(',') : def)
