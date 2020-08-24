import { UserData } from '../model/user'

export interface UserRepository {
  findAllUsers: () => Promise<UserData[]>
  findUserByEmail: (email: string) => Promise<UserData>
  add: (user: UserData) => Promise<void>
  exists: (email: string) => Promise<boolean>
}
