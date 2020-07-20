import { User } from '../entities/user'
import { UserRepository } from './port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

test('should register new user on mailing list', () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  const users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  expect(sut.registerUserOnMailingList(username, useremail)).toBeTruthy()
})

test('should not register existing user on mailing list', () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  const users: User[] = [new User(username, useremail)]
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  expect(sut.registerUserOnMailingList(username, useremail)).toBeFalsy()
})
