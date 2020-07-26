import { MailService } from './port/mail-service'
import { MailServiceError } from './port/errors/mail-service-error'
import { Either, Result, right, left } from '../shared/result'

type Response = Either<MailServiceError | Result<any>, Result<void>>

export class SendEmailToUserWithAttachment {
  constructor (public mailService: MailService) {}

  async sendEmailToUserWithAttachment (mailInfo: Object): Promise<Response> {
    const sent = await this.mailService.send(mailInfo)
    if (sent) {
      return right(Result.ok())
    }
    return left(new MailServiceError('Error trying to send e-mail'))
  }
}
