import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError, InvalidParamError } from './errors'
import { badRequest, serverError, ok } from './helpers/http-helper'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'
import { SendEmail } from '../../../usecases/send-email-to-user-with-bonus/send-email'
import { SendEmailResponse } from '../../../usecases/send-email-to-user-with-bonus/send-email-response'
import { RegisterUserResponse } from '../../../usecases/register-user-on-mailing-list/register-user-response'

export class RegisterUserController {
  private readonly registerUser: RegisterUser
  private readonly sendEmailToUser: SendEmail

  constructor (registerUser: RegisterUser, sendEmailToUser: SendEmail) {
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
      const user = { name: httpRequest.body.name, email: httpRequest.body.email }
      try {
        const ret: RegisterUserResponse = await this.registerUser.registerUserOnMailingList(user)
        if (ret.value instanceof InvalidParamError) {
          return badRequest(new InvalidParamError('email or name'))
        }
      } catch (error) {
        return serverError('registration')
      }
      try {
        const ret: SendEmailResponse = await this.sendEmailToUser.sendEmailToUserWithBonus(user)
        if (ret.value instanceof InvalidParamError) {
          return badRequest(new InvalidParamError('email or name'))
        }
      } catch (error) {
        return serverError('email')
      }
      return ok(user)
    } catch (error) {
      return serverError('internal')
    }
  }
}
