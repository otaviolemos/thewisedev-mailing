import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest } from './helpers/http-helper'

export class RegisterUserController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
