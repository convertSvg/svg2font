import { unicodeToCodePoint, codePointToUnicode, unicodeToString } from '../../lib/utils'

describe("utils coverage test", () => {
  test("unicodeToCodePoint", () => {
    expect(unicodeToCodePoint('2001')).toBe(8193)
  })

  test("codePointToUnicode", () => {
    expect(codePointToUnicode(8193)).toBe('2001')
  })

  test("unicodeToString", () => {
    expect(unicodeToString(20013)).toBe('中')
  })
})