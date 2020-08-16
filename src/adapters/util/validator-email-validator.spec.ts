import { ValidatorEmailValidator } from './validator-email-validator'

describe('Email validator adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new ValidatorEmailValidator()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
