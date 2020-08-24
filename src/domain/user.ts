import { UserData } from './user-data'

export class User {
  public readonly name: string
  public readonly email: string
  constructor (userData: UserData) {
    this.name = userData.name
    this.email = userData.email
  }
}
