import { HttpResponse } from '../ports/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})

// export const emailError = (): HttpResponse => ({
//   statusCode: 200,
//   body: new EmailError()
// })

// export const registerError = (): HttpResponse => ({
//   statusCode: 200,
//   body: new RegisterError()
// })
