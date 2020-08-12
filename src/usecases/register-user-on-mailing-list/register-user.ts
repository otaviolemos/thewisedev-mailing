import { Response } from './response'
import { User } from '../../domain/user'

export interface RegisterUser {
  registerUserOnMailingList: (user: User) => Promise<Response>
}
