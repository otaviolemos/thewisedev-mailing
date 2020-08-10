import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest } from './helpers/http-helper'
import { EmailValidator } from './ports/email-validator'
import { InvalidParamError } from './errors/invalid-param-error'

export class RegisterUserController {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
