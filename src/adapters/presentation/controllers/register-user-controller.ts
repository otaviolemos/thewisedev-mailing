import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from '../controllers/errors/missing-param-error'
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
      if (!httpRequest.body.name || !httpRequest.body.email) {
        const field = !httpRequest.body.name ? 'name' : 'email'
        return badRequest(new MissingParamError(field))
      }
      const userData = { name: httpRequest.body.name, email: httpRequest.body.email }
      const registerUserResponse: RegisterUserResponse = await this.registerUser.registerUserOnMailingList(userData)
      if (registerUserResponse.isLeft()) {
        return badRequest(registerUserResponse.value)
      }
      const sendEmailResponse: SendEmailResponse = await this.sendEmailToUser.sendEmailToUserWithBonus(userData)
      if (sendEmailResponse.isLeft()) {
        return serverError(sendEmailResponse.value.message)
      }
      return ok(userData)
    } catch (error) {
      return serverError('internal')
    }
  }
}
