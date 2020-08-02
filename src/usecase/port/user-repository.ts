import { User } from '../../domain/user'

export interface UserData {
  name: string
  email: string
}

export interface UserRepository {
  findAllUsers: () => Promise<User[]>
  findUserByEmail: (email: string) => Promise<User>
  add: (user: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}
