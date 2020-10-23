import { UserData } from '../../domain/user-data'
import { UserRepository } from '../ports/user-repository'
import { left, right, Either } from '../../shared/either'
import { ExistingUserError } from '../errors/existing-user-error'
import { RegisterUser } from './register-user'
import { RegisterUserResponse } from './register-user-response'
import { User } from '../../domain/user'
import { InvalidNameError } from '../../domain/errors/invalid-name'
import { InvalidEmailError } from '../../domain/errors/invalid-email'

export class RegisterUserOnMailingList implements RegisterUser {
  private readonly userRepository: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepository = userRepo
  }

  async registerUserOnMailingList (userData: UserData): Promise<RegisterUserResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(userData)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const user: User = userOrError.value
    const exists = this.userRepository.exists(user.email.value)
    if ((await exists).valueOf()) {
      return left(new ExistingUserError())
    }
    await this.userRepository.add({ name: user.name.value, email: user.email.value })
    return right(userData)
  }
}
