import { RegisterController } from './register-controller'

describe('Register Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new RegisterController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
