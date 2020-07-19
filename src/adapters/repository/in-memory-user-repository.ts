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
    const oldLen = this.users.length
    this.users.push(user)
    if (oldLen < this.users.length) {
      return true
    }
    return false
  }
}
