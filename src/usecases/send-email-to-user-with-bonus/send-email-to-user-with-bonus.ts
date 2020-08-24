import { EmailService, EmailOptions } from '../ports/email-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'
import { UserData } from '../../domain/user-data'
import { User } from '../../domain/user'
import { MessageInfo } from './message-info'

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  private readonly messageInfo: MessageInfo
  constructor (mailOptions: EmailOptions, mailService: EmailService, messageInfo: MessageInfo) {
    this.mailOptions = mailOptions
    this.mailService = mailService
    this.messageInfo = messageInfo
  }

  async sendEmailToUserWithBonus (userData: UserData): Promise<SendEmailResponse> {
    const user = new User(userData)
    this.mailOptions.to = user.name + '<' + user.email + '>'
    this.mailOptions.subject = this.messageInfo.subject
    this.mailOptions.text = this.messageInfo.text
    this.mailOptions.html = this.messageInfo.html
    this.mailOptions.attachments = this.messageInfo.attachments
    const sent = await this.mailService.send(this.mailOptions)
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
