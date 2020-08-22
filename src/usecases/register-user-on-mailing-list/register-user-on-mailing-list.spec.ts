import { User } from '../../domain/user'
import { UserRepository } from '../ports/user-repository'
import { InMemoryUserRepository } from '../../adapters/repositories/in-memory/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ExistingUserError } from '../ports/errors/existing-user-error'

describe('Register user on mailing list use case', () => {
  test('should register new user on mailing list with complete data', async () => {
    const username = 'any_name'
    const useremail = 'any_email@mail.com'
    var users: User[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    await sut.registerUserOnMailingList(new User(username, useremail))
    const user = repo.findUserByEmail(useremail)
    expect((await user).email).toEqual('any_email@mail.com')
  })

  test('should not register new user with invalid name', async () => {
    const username = ''
    const useremail = 'any_email@mail.com'
    var users: User[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList(new User(username, useremail))
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register new user with invalid email', async () => {
    const username = 'any_name'
    const useremail = ''
    var users: User[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList(new User(username, useremail))
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register new user with undefined email', async () => {
    const username = 'any_name'
    let useremail: string
    var users: User[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList(new User(username, useremail))
    expect(error.value).toBeInstanceOf(InvalidParamError)
  })

  test('should not register existing user on mailing list', async () => {
    const username = 'any_name'
    const useremail = 'any_email@mail.com'
    const users: User[] = [new User(username, useremail)]
    const repo: UserRepository = new InMemoryUserRepository(users)
    const sut = new RegisterUserOnMailingList(repo)
    const error = await sut.registerUserOnMailingList(new User(username, useremail))
    expect(error.value).toBeInstanceOf(ExistingUserError)
  })
})
