import { Email } from './email'

describe('Email validator', () => {
  test('Should accept valid email (valid classes)', () => {
    expect(Email.validate('otaviolemos@gmail.com')).toBe(true)
  })

  test('Should not accept email without the at-sign (2)', () => {
    expect(Email.validate('otaviolemosgmail.com')).toBe(false)
  })

  test('Should not accept more than 64 chars on local part (4)', () => {
    var localPart = 'c'.repeat(100)
    const email = localPart + '@gmail.com'
    expect(Email.validate(email)).toBe(false)
  })

  test('Should not accept empty local part (5)', () => {
    expect(Email.validate('@gmail.com')).toBe(false)
  })

  test('Should not accept invalid char - local part (7)', () => {
    expect(Email.validate('ot violemos@gmail.com')).toBe(false)
  })

  test('Should not accept a dot as first char - local part (9)', () => {
    expect(Email.validate('.otaviolemos@gmail.com')).toBe(false)
  })

  test('Should not accept a dot as last char - local part (11)', () => {
    expect(Email.validate('otaviolemos.@gmail.com')).toBe(false)
  })

  test('Should not accept more than 255 chars on domain part (4)', () => {
    const domain = 'c'.repeat(260)
    const email = 'otaviolemos@' + domain + '.com'
    expect(Email.validate(email)).toBe(false)
  })

  test('Should not accept dot as first char - domain part', () => {
    expect(Email.validate('otaviolemos@.gmail.com')).toBe(false)
  })
})
