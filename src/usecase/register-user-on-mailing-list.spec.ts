import { User } from '../domain/user'
import { UserRepository } from './port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InvalidParamError } from './errors/invalid-param-error'
import { ExistingUserError } from './port/errors/existing-user-error'

// todo: change all emails and names; remove my names and email ;)

test('should register new user on mailing list with complete data', async () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  await sut.registerUserOnMailingList(username, useremail)
  const user = repo.findUserByEmail(useremail)
  expect((await user).email).toEqual('otaviolemos@gmail.com')
})

test('should not register new user with invalid name', async () => {
  const username = ''
  const useremail = 'otaviolemos@gmail.com'
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = await sut.registerUserOnMailingList(username, useremail)
  expect(error.value).toBeInstanceOf(InvalidParamError)
})

test('should not register new user with invalid email', async () => {
  const username = 'Otávio Lemos'
  const useremail = ''
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = await sut.registerUserOnMailingList(username, useremail)
  expect(error.value).toBeInstanceOf(InvalidParamError)
})

test('should not register existing user on mailing list', async () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  const users: User[] = [new User(username, useremail)]
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = await sut.registerUserOnMailingList(username, useremail)
  expect(error.value).toBeInstanceOf(ExistingUserError)
})
