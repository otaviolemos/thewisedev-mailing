import { RegisterUserController } from './register-user-controller'
import { MissingParamError, ServerError } from './errors'
import { left, right } from '../../../shared/either'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'
import { UserData } from '../../../entities/user/user-data'
import { SendEmail } from '../../../usecases/send-email-to-user-with-bonus/send-email'
import { RegisterUserResponse } from '../../../usecases/register-user-on-mailing-list/register-user-response'
import { SendEmailResponse } from '../../../usecases/send-email-to-user-with-bonus/send-email-response'
import { InvalidNameError } from '../../../entities/user/errors/invalid-name'
import { InvalidEmailError } from '../../../entities/user/errors/invalid-email'
import { EmailOptions } from '../../../usecases/ports/email-service'

interface SutType {
  sut: RegisterUserController
  registerUserStub: RegisterUser
  sendEmailToUserStub: SendEmail
}

const makeRegisterUser = (): RegisterUser => {
  class RegisterUserOnMailingListStub implements RegisterUser {
    async registerUserOnMailingList (user: UserData): Promise<RegisterUserResponse> {
      return await Promise.resolve(right(user))
    }
  }
  return new RegisterUserOnMailingListStub()
}

const attachmentFilePath: string = '../resources/test.txt'
const fromName = 'Test'
const fromEmail = 'from_email@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: 'test',
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments
}

const makeSendEmailToUser = (): SendEmail => {
  class SendEmailToUserStub implements SendEmail {
    async sendEmailToUserWithBonus (user: UserData): Promise<SendEmailResponse> {
      return await Promise.resolve(right(mailOptions))
    }
  }
  return new SendEmailToUserStub()
}

const makeSut = (): SutType => {
  const registerUserStub = makeRegisterUser()
  const sendEmailToUserStub = makeSendEmailToUser()
  const sut = new RegisterUserController(registerUserStub, sendEmailToUserStub)
  return { sut, registerUserStub, sendEmailToUserStub }
}

describe('Register User Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name').message)
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email').message)
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, registerUserStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email'
      }
    }
    jest.spyOn(registerUserStub, 'registerUserOnMailingList').mockImplementationOnce(
      async (user: UserData) => {
        return await Promise.resolve(left(new InvalidEmailError(user.email)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidEmailError(httpRequest.body.email).message)
  })

  test('should return 400 if an invalid name is provided', async () => {
    const { sut, registerUserStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'O',
        email: 'valid@mail.com'
      }
    }
    jest.spyOn(registerUserStub, 'registerUserOnMailingList').mockImplementationOnce(
      async (user: UserData) => {
        return await Promise.resolve(left(new InvalidNameError(user.name)))
      })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should call RegisterUserOnMailingList with correct values and return 200', async () => {
    const { sut, registerUserStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserStub, 'registerUserOnMailingList')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(registerSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(response.statusCode).toEqual(200)
  })

  test('should call SendEmailToUserWithBonus with correct values and return 200', async () => {
    const { sut, sendEmailToUserStub } = makeSut()
    const sendEmailSpy = jest.spyOn(sendEmailToUserStub, 'sendEmailToUserWithBonus')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(sendEmailSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(response.statusCode).toEqual(200)
  })

  test('should return 500 if register user throws', async () => {
    const { sut, registerUserStub } = makeSut()
    jest.spyOn(registerUserStub, 'registerUserOnMailingList').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toEqual(500)
    expect((response.body as ServerError).message).toEqual('Server error: internal.')
  })

  test('should return 500 if send email user throws', async () => {
    const { sut, sendEmailToUserStub } = makeSut()
    jest.spyOn(sendEmailToUserStub, 'sendEmailToUserWithBonus').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toEqual(500)
    expect((response.body as ServerError).message).toEqual('Server error: internal.')
  })
})
