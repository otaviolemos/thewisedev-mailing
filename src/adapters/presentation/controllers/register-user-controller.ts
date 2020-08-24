import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError, InvalidParamError } from './errors'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { EmailValidator } from './ports/email-validator'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'
import { UserData } from '../../../domain/user'
import { SendEmail } from '../../../usecases/send-email-to-user-with-bonus/send-email'

export class RegisterUserController {
  private readonly emailValidator: EmailValidator
  private readonly registerUser: RegisterUser
  private readonly sendEmailToUser: SendEmail

  constructor (emailValidator: EmailValidator, registerUser: RegisterUser, sendEmailToUser: SendEmail) {
    this.emailValidator = emailValidator
    this.registerUser = registerUser
    this.sendEmailToUser = sendEmailToUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const user = new UserData(httpRequest.body.name, httpRequest.body.email)
      try {
        await this.registerUser.registerUserOnMailingList(user)
      } catch (error) {
        return serverError('registration')
      }
      try {
        await this.sendEmailToUser.sendEmailToUserWithBonus(user)
      } catch (error) {
        return serverError('email')
      }
      return ok(user)
    } catch (error) {
      return serverError('internal')
    }
  }
}
