import { validateEmail } from './validators'

describe('Email validator', () => {
  test('Should accept valid email (valid classes)', () => {
    expect(validateEmail('otaviolemos@gmail.com')).toBe(true)
  })

  test('Should not accept email without the at-sign (2)', () => {
    expect(validateEmail('otaviolemosgmail.com')).toBe(false)
  })

  test('Should not accept more than 64 chars on local part (4)', () => {
    var localPart = ''
    for (let i = 0; i <= 100; i++) {
      localPart += 'c'
    }
    const email = localPart + '@gmail.com'
    expect(validateEmail(email)).toBe(false)
  })

  test('Should not accept empty local part (5)', () => {
    expect(validateEmail('@gmail.com')).toBe(false)
  })

  test('Should not accept invalid char - local part (7)', () => {
    expect(validateEmail('ot violemos@gmail.com')).toBe(false)
  })

  test('Should not accept a dot as first char - local part (9)', () => {
    expect(validateEmail('.otaviolemos@gmail.com')).toBe(false)
  })

  test('Should not accept a dot as last char - local part (11)', () => {
    expect(validateEmail('otaviolemos.@gmail.com')).toBe(false)
  })

  test('Should not accept more than 255 chars on domain part (4)', () => {
    let domain = ''
    for (let i = 0; i <= 260; i++) {
      domain += 'c'
    }
    const email = 'otaviolemos@' + domain + '.com'
    expect(validateEmail(email)).toBe(false)
  })

  test('Should not accept dot as first char - domain part', () => {
    expect(validateEmail('otaviolemos@.gmail.com')).toBe(false)
  })
})
