import { User } from '../../domain/user'

export interface UserRepository {
  findAllUsers: () => User[]
  findUserByEmail: (email: string) => User
  add: (user: User) => Error
}
