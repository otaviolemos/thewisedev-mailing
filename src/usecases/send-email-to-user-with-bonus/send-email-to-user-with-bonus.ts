import { EmailService, EmailOptions } from '../ports/email-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'
import { UserData } from '../model/user-data'

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUserWithBonus (user: UserData): Promise<SendEmailResponse> {
    this.mailOptions.to = user.name + '<' + user.email + '>'
    const sent = await this.mailService.send(this.mailOptions)
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
