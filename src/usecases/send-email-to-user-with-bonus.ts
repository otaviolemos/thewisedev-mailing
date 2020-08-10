import { MailService, MailOptions } from './ports/mail-service'
import { MailServiceError } from './ports/errors/mail-service-error'
import { Either, Result, right, left } from '../shared/result'

type Response = Either<MailServiceError | Result<any>, Result<void>>

export class SendEmailToUserWithBonus {
  constructor (public mailService: MailService) {}

  async sendEmailToUserWithBonus (options: MailOptions): Promise<Response> {
    const sent = await this.mailService.send(options)
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
