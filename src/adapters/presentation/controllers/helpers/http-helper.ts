import { HttpResponse } from '../ports/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

// export const mailError = (): HttpResponse => ({
//   statusCode: 200,
//   body: new EmailError()
// })

// export const registerError = (): HttpResponse => ({
//   statusCode: 200,
//   body: new RegisterError()
// })
