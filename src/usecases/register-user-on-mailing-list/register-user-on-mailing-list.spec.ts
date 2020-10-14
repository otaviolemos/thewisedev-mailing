import { UserData } from '../../domain/user-data'
import { UserRepository } from '../ports/user-repository'
import { InMemoryUserRepository } from '../../adapters/repositories/in-memory/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InvalidParamError } from '../../domain/errors/invalid-param-error'
import { ExistingUserError } from '../ports/errors/existing-user-error'

describe('Register user on mailing list use case', () => {
  test('should register new user on mailing list with complete data', async () => {
    const name = 'any_name'
    const email = 'any_email@mail.com'
    var users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    await sut.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).email).toEqual('any_email@mail.com')
  })

  test('should not register new user with empty name', async () => {
    const name = ''
    const email = 'any_email@mail.com'
    var users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList({ name, email })
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register new user with invalid name', async () => {
    const name = 'O'
    const email = 'any_email@mail.com'
    var users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList({ name, email })
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register new user with empty email', async () => {
    const name = 'any_name'
    const email = ''
    var users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList({ name, email })
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register new user with undefined email', async () => {
    const name = 'any_name'
    let email: string
    var users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList({ name, email })
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register existing user on mailing list', async () => {
    const name = 'any_name'
    const email = 'any_email@mail.com'
    const users: UserData[] = [{ name, email }]
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList({ name, email })
    expect(error.value).toBeInstanceOf(ExistingUserError)
  })
})
