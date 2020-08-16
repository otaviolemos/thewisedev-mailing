import { ValidatorEmailValidator } from './validator-email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email validator adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new ValidatorEmailValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = new ValidatorEmailValidator()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
