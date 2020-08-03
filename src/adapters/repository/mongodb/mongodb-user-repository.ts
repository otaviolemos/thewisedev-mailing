import { UserRepository } from '../../../usecase/port/user-repository'
import { User } from '../../../domain/user'

export class MongodbUserRepository implements UserRepository {
  async findAllUsers (): Promise<User[]> {
    return []
  }

  async findUserByEmail (email: string): Promise<User> {
    return new User('any_name', 'any_email@mail.com')
  }

  async add (user: User): Promise<void> {
  }

  async exists (email: string): Promise<boolean> {
    return true
  }
}
