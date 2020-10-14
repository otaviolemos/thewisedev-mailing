import { InvalidParamError } from './errors/invalid-param-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail', async () => {
    const user = User.create({ name: 'Otavio', email: 'not_an_email' })
    console.log(user)
    expect(user).toEqual(new InvalidParamError('email'))
  })

  test('should not create user with invalid name (too few characters)', async () => {
    const user = User.create({ name: 'O', email: 'otaviolemos@gmail.com' })
    expect(user).toEqual(new InvalidParamError('name'))
  })

  test('should not create user with invalid name (too many characters)', async () => {
    let name: string = ''
    for (let i = 0; i < 256; i++) {
      name += 'c'
    }
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com' })
    expect(user).toEqual(new InvalidParamError('name'))
  })
})
