import { User } from '../domain/user'
import { UserRepository } from './port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { ExistingUserError } from '../adapters/repository/errors/existing-user-error'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InvalidParamError } from './errors/invalid-param-error'

// todo: it appears that it's best for the use cases to return Promise<void> (or look at core below)
// todo: create a use case interface with IRequest, IResponse
// look here: https://github.com/stemmlerjs/ddd-forum/tree/master/src/shared/core
// and here: https://github.com/stemmlerjs/ddd-forum/tree/master/src/modules/users/useCases
// look here: Either type https://blog.logrocket.com/safer-code-with-container-types-either-and-maybe/
// and here: https://github.com/joanllenas/ts.data.either

test('should register new user on mailing list with complete data', () => {
  const username = 'Otávio Lemos'
  const useremail = 'otaviolemos@gmail.com'
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  sut.registerUserOnMailingList(username, useremail)
  const user = repo.findUserByEmail(useremail)
  expect(user.email).toEqual('otaviolemos@gmail.com')
})

test('should not register new user with invalid name', () => {
  const username = ''
  const useremail = 'otaviolemos@gmail.com'
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = sut.registerUserOnMailingList(username, useremail)
  expect(error).toEqual(new InvalidParamError('Invalid user name or email.'))
})

test('should not register new user with invalid email', () => {
  const username = 'Otávio Lemos'
  const useremail = ''
  var users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(repo)
  const error = sut.registerUserOnMailingList(username, useremail)
  expect(error).toEqual(new InvalidParamError('Invalid user name or email.'))
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
