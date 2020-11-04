import { left } from '../../shared/either'
import { InvalidEmailError } from './errors/invalid-email'
import { InvalidNameError } from './errors/invalid-name'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail', async () => {
    const email = 'not_an_email'
    const userOrError = User.create({ name: 'Otavio', email: email })
    expect(userOrError).toEqual(left(new InvalidEmailError(email)))
  })

  test('should not create user with invalid name (too few characters)', async () => {
    const name = 'O'
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com' })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (too many characters)', async () => {
    let name: string = ''
    for (let i = 0; i < 256; i++) {
      name += 'c'
    }
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com' })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })

  test('should not create user with invalid name (only blank spaces)', async () => {
    const name = '   '
    const user = User.create({ name: name, email: 'otaviolemos@gmail.com' })
    expect(user).toEqual(left(new InvalidNameError(name)))
  })
})
