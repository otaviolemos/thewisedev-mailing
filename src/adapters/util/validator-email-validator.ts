import { EmailValidator } from '../presentation/controllers/ports/email-validator'

export class ValidatorEmailValidator implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
