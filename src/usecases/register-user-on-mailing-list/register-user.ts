import { RegisterUserResponse } from './register-user-response'
import { User } from '../../domain/user'

export interface RegisterUser {
  registerUserOnMailingList: (user: User) => Promise<RegisterUserResponse>
}
