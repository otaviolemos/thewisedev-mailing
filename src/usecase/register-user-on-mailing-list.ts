import { User } from '../entities/user'
import { UserRepository } from './port/user-repository'

export class RegisterUserOnMailingList {
  constructor (public userRepository: UserRepository) {}

  registerUserOnMailingList (name: string, email: string): Error {
    if (name !== null && name !== '' &&
        email !== null && email !== '') {
      const u = new User(name, email)
      return this.userRepository.add(u)
    }
  }
}
