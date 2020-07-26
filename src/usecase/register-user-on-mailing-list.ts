import { User } from '../domain/user'
import { UserRepository } from './port/user-repository'
import { InvalidParamError } from './errors/invalid-param-error'
import { Either, Result, left, right } from '../shared/result'
import { ExistingUserError } from './port/errors/existing-user-error'
import { validString } from '../shared/util'

type Response = Either<InvalidParamError | ExistingUserError | Result<any>, Result<void>>

export class RegisterUserOnMailingList {
  private readonly userRepository: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async registerUserOnMailingList (name: string, email: string): Promise<Response> {
    if (validString(name) && validString(email)) {
      const u = new User(name, email)
      const exists = this.userRepository.exists(email)
      if (!(await exists).valueOf()) {
        await this.userRepository.save(u)
        return right(Result.ok())
      } else {
        return left(new ExistingUserError('User already registered')) as Response
      }
    }
    return left(new InvalidParamError('Invalid user name or email.')) as Response
  }
}
