import { EmailService, EmailOptions } from '../ports/email-service'
import { MailServiceError } from '../errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { right, left, Either } from '../../shared/either'
import { SendEmail } from './send-email'
import { UserData } from '../../domain/user-data'
import { User } from '../../domain/user'
import { InvalidNameError } from '../../domain/errors/invalid-name'
import { Name } from '../../domain/name'
import { InvalidEmailError } from '../../domain/errors/invalid-email'
import { Email } from '../../domain/email'

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUserWithBonus (userData: UserData): Promise<SendEmailResponse> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name)
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(userData.email)

    if (nameOrError.isLeft()) {
      return left(nameOrError)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError)
    }

    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(userData)
    const user: User = (userOrError.value as User)

    const greetings = 'E aí <b>' + user.name.value + '</b>, beleza?'
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
      return right(true)
    }
    return left(new MailServiceError())
  }
}
