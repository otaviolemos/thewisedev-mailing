import { User } from '../../domain/user'
import { UserRepository } from '../ports/user-repository'
import { InvalidParamError } from '../errors/invalid-param-error'
import { Result, left, right } from '../../shared/result'
import { ExistingUserError } from '../ports/errors/existing-user-error'
import { RegisterUser } from './register-user'
import { RegisterUserResponse } from './register-user-response'

export class RegisterUserOnMailingList implements RegisterUser {
  private readonly userRepository: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async registerUserOnMailingList (user: User): Promise<RegisterUserResponse> {
    if (this.validateString(user.name) && this.validateString(user.email)) {
      const exists = this.userRepository.exists(user.email)
      if (!(await exists).valueOf()) {
        await this.userRepository.add(user)
        return right(Result.ok())
      } else {
        return left(new ExistingUserError())
      }
    }
    return this.validateString(user.name) ? left(new InvalidParamError('name'))
      : left(new InvalidParamError('email'))
  }

  private validateString (str: string): boolean {
    if (str == null || str === '') {
      return false
    }
    return true
  }
}
