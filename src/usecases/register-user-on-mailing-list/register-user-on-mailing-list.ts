import { User } from '../../domain/user'
import { UserRepository } from '../ports/user-repository'
import { InvalidParamError } from '../errors/invalid-param-error'
import { Result, left, right } from '../../shared/result'
import { ExistingUserError } from '../ports/errors/existing-user-error'
import { validString } from '../../shared/util'
import { RegisterUser } from './register-user'
import { Response } from './response'

export class RegisterUserOnMailingList implements RegisterUser {
  private readonly userRepository: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async registerUserOnMailingList (user: User): Promise<Response> {
    if (validString(user.name) && validString(user.email)) {
      const exists = this.userRepository.exists(user.email)
      if (!(await exists).valueOf()) {
        await this.userRepository.add(user)
        return right(Result.ok())
      } else {
        return left(new ExistingUserError())
      }
    }
    return validString(user.name) ? left(new InvalidParamError('name'))
      : left(new InvalidParamError('email'))
  }
}
