import { UserData } from './user-data'
import { Email } from './email'
import { Name } from './name'

export class User {
  public readonly name: Name
  public readonly email: Email
  constructor (userData: UserData) {
    this.name = new Name(userData.name)
    this.email = new Email(userData.email)
  }
}
