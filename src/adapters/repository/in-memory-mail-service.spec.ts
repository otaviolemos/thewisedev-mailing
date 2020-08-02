import { User } from '../../domain/user'
import { InMemoryUserRepository } from './in-memory-user-repository'
import { UserNotFoundError } from '../../usecase/port/errors/user-not-found-error'

describe('In memory User repository', () => {
  test('should throw errro is user is not found', async () => {
    const users: User[] = []
    const userRepo = new InMemoryUserRepository(users)
    try {
      await userRepo.findUserByEmail('any_email@mail.com')
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError)
    }
  })
})
