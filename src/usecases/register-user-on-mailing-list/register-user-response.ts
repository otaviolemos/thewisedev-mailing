import { Either } from '../../shared/either'
import { ExistingUserError } from '../errors/existing-user-error'
import { InvalidEmailError } from '../../domain/errors/invalid-email'
import { InvalidNameError } from '../../domain/errors/invalid-name'
import { UserData } from '../../domain/user-data'

export type RegisterUserResponse = Either<InvalidNameError | InvalidEmailError | ExistingUserError, UserData>
