import { RegisterUserController } from './register-user-controller'
import { MissingParamError, InvalidParamError, ServerError } from './errors'
import { EmailValidator } from './ports/email-validator'
import { Result, right } from '../../../shared/result'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'
import { UserData } from '../../../usecases/model/user'
import { SendEmail } from '../../../usecases/send-email-to-user-with-bonus/send-email'
import { RegisterUserResponse } from '../../../usecases/register-user-on-mailing-list/register-user-response'
import { SendEmailResponse } from '../../../usecases/send-email-to-user-with-bonus/send-email-response'

interface SutType {
  sut: RegisterUserController
  emailValidatorStub: EmailValidator
  registerUserStub: RegisterUser
  sendEmailToUserStub: SendEmail
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeRegisterUser = (): RegisterUser => {
  class RegisterUserOnMailingListStub implements RegisterUser {
    async registerUserOnMailingList (user: UserData): Promise<RegisterUserResponse> {
      return await Promise.resolve(right(Result.ok()))
    }
  }
  return new RegisterUserOnMailingListStub()
}

const makeSendEmailToUser = (): SendEmail => {
  class SendEmailToUserStub implements SendEmail {
    async sendEmailToUserWithBonus (user: UserData): Promise<SendEmailResponse> {
      return await Promise.resolve(right(Result.ok()))
    }
  }
  return new SendEmailToUserStub()
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator()
  const registerUserStub = makeRegisterUser()
  const sendEmailToUserStub = makeSendEmailToUser()
  const sut = new RegisterUserController(emailValidatorStub, registerUserStub, sendEmailToUserStub)
  return { sut, emailValidatorStub, registerUserStub, sendEmailToUserStub }
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
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('should call email validator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return 500 if email validator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect((httpResponse.body as ServerError).message).toEqual('Server error: internal.')
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
    expect((response.body as ServerError).message).toEqual('Server error: registration.')
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
    expect((response.body as ServerError).message).toEqual('Server error: email.')
  })
})
