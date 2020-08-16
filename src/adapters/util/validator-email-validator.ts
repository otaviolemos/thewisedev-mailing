import { EmailValidator } from '../presentation/controllers/ports/email-validator'
import validator from 'validator'

export class ValidatorEmailValidator implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
