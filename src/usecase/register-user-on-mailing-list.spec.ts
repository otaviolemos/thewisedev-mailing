import { User } from '../entities/user'
import { UserRepository } from './port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { ExistingUserError } from '../adapters/repository/errors/existing-user-error'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

// todo: make use case return void and return errors instead of false
// invalidParamError - use case

test('should register new user on mailing list with complete data', () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  sut.registerUserOnMailingList(username, useremail)
  users = repo.findAllUsers()
  var exists = false
  for (var user of users) {
    if (user.email === useremail && user.name === username) {
      exists = true
    }
  }
  expect(exists).toBeTruthy()
})

test('should not register existing user on mailing list', () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  const users: User[] = [new User(username, useremail)]
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = sut.registerUserOnMailingList(username, useremail)
  expect(error).toEqual(new ExistingUserError('User e-mail already exists.'))
})
