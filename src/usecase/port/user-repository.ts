import { User } from '../../domain/user'

export interface UserRepository {
  findAllUsers: () => Promise<User[]>
  findUserByEmail: (email: string) => Promise<User>
  save: (user: User) => Promise<void>
  exists: (email: string) => Promise<boolean>
}
