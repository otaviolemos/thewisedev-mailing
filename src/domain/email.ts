import { InvalidParamError } from './errors/invalid-param-error'
import { validateEmail, validateString } from './validators'

export class Email {
  private readonly email: string

  constructor (email: string) {
    if (!validateString(email) || !validateEmail(email)) {
      throw new InvalidParamError('email')
    }
    this.email = email
  }

  get value (): string {
    return this.email
  }
}
