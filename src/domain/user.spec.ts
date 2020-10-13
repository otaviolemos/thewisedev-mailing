import { InvalidParamError } from './errors/invalid-param-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail', async () => {
    expect(() => {
      const user = new User({ name: 'Otavio', email: 'not_an_email' })
      console.log(user)
    }).toThrow(InvalidParamError)
  })

  test('should not create user with invalid name (too few characters)', async () => {
    expect(() => {
      const user = new User({ name: 'O', email: 'otaviolemos@gmail.com' })
      console.log(user)
    }).toThrow(InvalidParamError)
  })

  test('should not create user with invalid name (too many characters)', async () => {
    expect(() => {
      let name: string = ''
      for (let i = 0; i < 256; i++) {
        name += 'c'
      }
      const user = new User({ name: name, email: 'otaviolemos@gmail.com' })
      console.log(user)
    }).toThrow(InvalidParamError)
  })
})
