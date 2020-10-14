import { InvalidParamError } from './errors/invalid-param-error'
import { validateEmail, validateString } from './validators'

export class Email {
  private readonly email: string

  private constructor (email: string) {
    this.email = email
    Object.freeze(this)
  }

  static create (email: string): Email | InvalidParamError {
    if (!validateString(email) || !validateEmail(email)) {
      return new InvalidParamError('email')
    }
    return new Email(email)
  }

  get value (): string {
    return this.email
  }
}
