import { Response } from './response'

export interface RegisterUser {
  registerUserOnMailingList: (name: string, email: string) => Promise<Response>
}
