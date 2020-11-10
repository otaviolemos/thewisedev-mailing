import { UserRepository } from '../../ports/user-repository'
import { UserData } from '../../../entities/user/user-data'

export class InMemoryUserRepository implements UserRepository {
  users: UserData[] = []
  constructor (users: UserData[]) {
    this.users = users
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.users
  }

  async findUserByEmail (email: string): Promise<UserData> {
    var u: UserData
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

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user.email)
    if (!exists) {
      this.users.push(user)
    }
  }
}
