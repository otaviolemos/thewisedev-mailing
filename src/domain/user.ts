import { UserData } from './user-data'
import { Email } from './email'
import { Name } from './name'
import { InvalidEmailError } from './errors/invalid-email'
import { Either, left, right } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name'

export class User {
  private readonly _name: Name
  private readonly _email: Email

  private constructor (name: Name, email: Email) {
    this._name = name
    this._email = email
    Object.freeze(this)
  }

  get name(): Name {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name)
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(userData.email)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    return right(new User(name, email))
  }
}
