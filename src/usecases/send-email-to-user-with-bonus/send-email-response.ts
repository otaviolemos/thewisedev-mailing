import { Either } from '../../shared/either'
import { MailServiceError } from '../errors/mail-service-error'

export type SendEmailResponse = Either<MailServiceError, boolean>
