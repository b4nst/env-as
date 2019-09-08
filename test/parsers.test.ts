import * as parsers from '../src/parsers'
import { TypeMap } from '../src/types'
import chance from 'chance'

const random = new chance('parsers')

describe('Parsers', () => {
  const deftype: TypeMap = {
    integer: 0,
    float: 0.0,
    boolean: false,
    string: '',
    array: []
  }

  const rtype: {
    [K in keyof TypeMap]: [
      string | undefined,
      TypeMap[K],
      TypeMap[K] | undefined
    ][]
  } = {
    integer: [
      ['3', 3, undefined],
      ['NaN', 0, undefined],
      [undefined, 0, undefined],
      ['NaN', 10, 10]
    ],
    float: [
      ['2.5', 2.5, undefined],
      ['NaN', 0.0, undefined],
      [undefined, 0.0, undefined],
      ['NaN', 7.9, 7.9]
    ],
    boolean: [
      ['true', true, undefined],
      ['foo', false, undefined],
      [undefined, false, undefined],
      ['foo', true, true]
    ],
    string: [
      ['foo', 'foo', undefined],
      [undefined, '', undefined],
      [undefined, 'foo', 'foo']
    ],
    array: [
      ['foo,bar,baz', ['foo', 'bar', 'baz'], undefined],
      ['foo', ['foo'], undefined],
      ['', [], undefined],
      [undefined, [], undefined],
      ['', ['foo', 'bar'], ['foo', 'bar']]
    ]
  }

  test('should parse all typemap', () => {
    expect(Object.keys(parsers)).toEqual(
      expect.arrayContaining(Object.keys(deftype))
    )
  })

  Object.keys(deftype).forEach(t =>
    describe(t, () => {
      test.each(rtype[t as keyof TypeMap])(
        '%p should parse to %p when default=%p',
        (raw, expected, def) => {
          const parser = parsers[t as keyof typeof parsers]
          expect(parser(raw, def as never)).toStrictEqual(expected)
        }
      )
    })
  )
})
