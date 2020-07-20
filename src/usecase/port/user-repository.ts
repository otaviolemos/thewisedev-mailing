import { User } from '../../entities/user'

export interface UserRepository {
  findAllUsers: () => User[]
  add: (user: User) => Error
}
