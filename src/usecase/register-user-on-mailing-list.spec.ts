import { User } from '../domain/user'
import { UserRepository } from './port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { Left } from '../shared/result'

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
  expect(error).toBeInstanceOf(Left)
})

test('should not register new user with invalid email', async () => {
  const username = 'Otávio Lemos'
  const useremail = ''
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = await sut.registerUserOnMailingList(username, useremail)
  expect(error).toBeInstanceOf(Left)
})

test('should not register existing user on mailing list', async () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  const users: User[] = [new User(username, useremail)]
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = await sut.registerUserOnMailingList(username, useremail)
  expect(error).toBeInstanceOf(Left)
})
