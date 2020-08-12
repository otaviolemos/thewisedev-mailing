import { RegisterUserController } from './register-user-controller'
import { MissingParamError, InvalidParamError, ServerError } from './errors'
import { EmailValidator } from './ports/email-validator'
import { Result, Either, right } from '../../../shared/result'
import { ExistingUserError } from '../../../usecases/ports/errors/existing-user-error'
import { RegisterUser } from '../../../usecases/register-user-on-mailing-list/register-user'
import { User } from '../../../domain/user'

interface SutType {
  sut: RegisterUserController
  emailValidatorStub: EmailValidator
  registerUserStub: RegisterUser
}

type Response = Either<InvalidParamError | ExistingUserError | Result<any>, Result<void>>

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
    async registerUserOnMailingList (user: User): Promise<Response> {
      return await Promise.resolve(right(Result.ok()))
    }
  }
  return new RegisterUserOnMailingListStub()
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator()
  const registerUserStub = makeRegisterUser()
  const sut = new RegisterUserController(emailValidatorStub, registerUserStub)
  return { sut, emailValidatorStub, registerUserStub }
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
    expect(httpResponse.body).toEqual(new ServerError())
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

  // test('should call SendEmail with correct values and return 200', async () => {
  //   const { sut, sendEmailStub } = makeSut()
  //   const sendEmailSpy = jest.spyOn(sendEmailStub, 'sendEmailToUserWithBonus')
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any_email@mail.com'
  //     }
  //   }
  //   const response = await sut.handle(httpRequest)
  //   const attachments = [{
  //     filename: 'any_filename',
  //     path: 'any_path'
  //   }]
  //   expect(sendEmailSpy).toHaveBeenCalledWith({
  //     host: 'test',
  //     port: 867,
  //     username: 'test',
  //     password: 'test',
  //     from: 'from_name' + ' ' + 'from_email@mail.com',
  //     to: 'any_name' + ' <' + 'any_email@mail.com' + '>',
  //     subject: 'subject',
  //     text: 'emailBody',
  //     html: 'emailBodyHtml',
  //     attachments: attachments
  //   })
  //   expect(response.statusCode).toEqual(200)
  // })
})
