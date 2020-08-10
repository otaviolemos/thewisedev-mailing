import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest } from './helpers/http-helper'

export class RegisterUserController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
