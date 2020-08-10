import { HttpResponse } from '../ports/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
