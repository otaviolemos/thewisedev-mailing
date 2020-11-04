import { Either } from '../../shared/either'
import { ExistingUserError } from '../errors/existing-user-error'
import { InvalidEmailError } from '../../entities/user/errors/invalid-email'
import { InvalidNameError } from '../../entities/user/errors/invalid-name'
import { UserData } from '../../entities/user/user-data'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | ExistingUserError, UserData>
