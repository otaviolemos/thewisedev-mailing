import { UserData } from '../../domain/user-data'
import { UserRepository } from '../ports/user-repository'
import { InvalidParamError } from '../../domain/errors/invalid-param-error'
import { Result, left, right } from '../../shared/result'
import { ExistingUserError } from '../ports/errors/existing-user-error'
import { RegisterUser } from './register-user'
import { RegisterUserResponse } from './register-user-response'
import { User } from '../../domain/user'

export class RegisterUserOnMailingList implements RegisterUser {
  private readonly userRepository: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async registerUserOnMailingList (userData: UserData): Promise<RegisterUserResponse> {
    const userOrError: User | InvalidParamError = User.create(userData)
    if (userOrError instanceof InvalidParamError) {
      return left(new InvalidParamError(userOrError.paramName))
    }
    const exists = this.userRepository.exists(userOrError.email.value)
    if (!(await exists).valueOf()) {
      await this.userRepository.add({ email: userOrError.email.value, name: userOrError.name.value })
      return right(Result.ok())
    } else {
      return left(new ExistingUserError())
    }
  }
}
