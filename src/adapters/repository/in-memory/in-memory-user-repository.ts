import { UserRepository } from '../../../usecase/port/user-repository'
import { User } from '../../../domain/user'

// todo: return null instead of raising exception
// todo: use this pattern consistently

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  constructor (users: User[]) {
    this.users = users
  }

  async findAllUsers (): Promise<User[]> {
    return this.users
  }

  async findUserByEmail (email: string): Promise<User> {
    var u: User
    for (u of this.users) {
      if (u.email === email) {
        return u
      }
    }
    return null
  }

  async exists (email: string): Promise<boolean> {
    if (await this.findUserByEmail(email) == null) {
      return false
    }
    return true
  }

  async add (user: User): Promise<void> {
    const exists = await this.exists(user.email)
    if (!exists) {
      this.users.push(user)
    }
  }
}
