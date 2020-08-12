import { MailService, MailOptions } from '../ports/mail-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'

export class SendEmailToUserWithBonus implements SendEmail {
  constructor (public mailService: MailService) {}

  async sendEmailToUserWithBonus (options: MailOptions): Promise<SendEmailResponse> {
    const sent = await this.mailService.send(options)
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
