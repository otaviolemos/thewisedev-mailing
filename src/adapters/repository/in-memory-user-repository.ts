import { UserRepository } from '../../usecase/port/user-repository'
import { User } from '../../entities/user'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  constructor (users: User[]) {
    this.users = users
  }

  findAllUsers (): User[] {
    return this.users
  }

  add (user: User): boolean {
    var u: User
    for (u of this.users) {
      if (u.email === user.email) {
        return false
      }
    }
    this.users.push(user)
    return true
  }
}
