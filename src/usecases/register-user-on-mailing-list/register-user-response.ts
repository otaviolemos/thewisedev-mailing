import { Either } from '../../shared/either'
import { ExistingUserError } from '../errors/existing-user-error'
import { InvalidEmailError } from '../../entities/errors/invalid-email'
import { InvalidNameError } from '../../entities/errors/invalid-name'
import { UserData } from '../../entities/user-data'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | ExistingUserError, UserData>
