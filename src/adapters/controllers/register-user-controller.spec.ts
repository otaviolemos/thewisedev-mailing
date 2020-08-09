import { RegisterUserController } from './register-user-controller'

describe('Register User Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new RegisterUserController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name.'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new RegisterUserController()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email.'))
  })
})
