import { User } from '../../domain/user'

export interface UserRepository {
  findAllUsers: () => User[]
  add: (user: User) => Error
}
