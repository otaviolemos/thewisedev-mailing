import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError, InvalidParamError } from './errors'
import { badRequest, serverError } from './helpers/http-helper'
import { EmailValidator } from './ports/email-validator'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'

export class RegisterUserController {
  private readonly emailValidator: EmailValidator
  private readonly registerUser: RegisterUser
  constructor (emailValidator: EmailValidator, registerUser: RegisterUser) {
    this.emailValidator = emailValidator
    this.registerUser = registerUser
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
      await this.registerUser.registerUserOnMailingList(httpRequest.body.name, httpRequest.body.email)
    } catch (error) {
      return serverError()
    }
  }
}
