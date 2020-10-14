import { UserData } from './user-data'
import { Email } from './email'
import { Name } from './name'
import { InvalidParamError } from './errors/invalid-param-error'

export class User {
  public readonly name: Name
  public readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (userData: UserData): User | InvalidParamError {
    const email: Email | InvalidParamError = Email.create(userData.email)
    const name: Name | InvalidParamError = Name.create(userData.name)
    if (email instanceof InvalidParamError) {
      return new InvalidParamError('email')
    }
    if (name instanceof InvalidParamError) {
      return new InvalidParamError('name')
    }
    return new User(name, email)
  }
}
