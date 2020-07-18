import { User } from '../entities/user'
import { UserRepository } from '../usecases/port/user-repository'
import { InMemoryUserRepository } from '../adapters/repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

test('should register new user on mailing list', () => {
  const user: User = new User('Otávio Lemos', 'otaviolemos@gmail.com')
  const users: User[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const sut = new RegisterUserOnMailingList(user, repo)
  sut.registerUserOnMailingList(user)
})
