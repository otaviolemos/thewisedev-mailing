import { MailService, MailOptions } from '../ports/mail-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'
import { User } from '../../domain/user'

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: MailService
  private readonly mailOptions: MailOptions
  constructor (mailOptions: MailOptions, mailService: MailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUserWithBonus (user: User): Promise<SendEmailResponse> {
    this.mailOptions.to = user.name + '<' + user.email + '>'
    const sent = await this.mailService.send(this.mailOptions)
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
