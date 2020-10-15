import { Either, Result } from '../../shared/result'
import { MailServiceError } from '../ports/errors/mail-service-error'

export type SendEmailResponse = Either<MailServiceError, Result<any> | Result<void>>
