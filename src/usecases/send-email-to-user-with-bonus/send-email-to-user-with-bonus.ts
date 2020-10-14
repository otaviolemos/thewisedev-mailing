import { EmailService, EmailOptions } from '../ports/email-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'
import { UserData } from '../../domain/user-data'
import { User } from '../../domain/user'
import { InvalidParamError } from '../../domain/errors/invalid-param-error'

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUserWithBonus (userData: UserData): Promise<SendEmailResponse> {
    const userOrError: User | InvalidParamError = User.create(userData)
    if (userOrError instanceof InvalidParamError) {
      return left(new InvalidParamError(userOrError.name))
    }

    const user: User = userOrError
    const greetings = 'E aí <b>' + userOrError.name.value + '</b>, beleza?'
    const customizedHtml = greetings + '<br> <br>' + this.mailOptions.html

    const options = {
      host: this.mailOptions.host,
      port: this.mailOptions.port,
      username: this.mailOptions.username,
      password: this.mailOptions.password,
      from: this.mailOptions.from,
      to: user.name.value + '<' + user.email.value + '>',
      subject: this.mailOptions.subject,
      text: this.mailOptions.text,
      html: customizedHtml,
      attachments: this.mailOptions.attachments
    }

    const sent = await this.mailService.send(options)

    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
