import { RegisterUserResponse } from './register-user-response'
import { UserData } from '../model/user'

export interface RegisterUser {
  registerUserOnMailingList: (user: UserData) => Promise<RegisterUserResponse>
}
