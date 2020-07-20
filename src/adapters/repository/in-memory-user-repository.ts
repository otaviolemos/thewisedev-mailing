import { UserRepository } from '../../usecase/port/user-repository'
import { User } from '../../domain/user'
import { ExistingUserError } from './errors/existing-user-error'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  constructor (users: User[]) {
    this.users = users
  }

  findAllUsers (): User[] {
    return this.users
  }

  add (user: User): Error {
    var u: User
    for (u of this.users) {
      if (u.email === user.email) {
        return new ExistingUserError('User e-mail already exists.')
      }
    }
    this.users.push(user)
  }
}
