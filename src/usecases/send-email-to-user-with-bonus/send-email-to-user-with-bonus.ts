import { EmailService, EmailOptions } from '../ports/email-service'
import { MailServiceError } from '../ports/errors/mail-service-error'
import { SendEmailResponse } from './send-email-response'
import { Result, right, left } from '../../shared/result'
import { SendEmail } from './send-email'
import { UserData } from '../../domain/user-data'
import { User } from '../../domain/user'

const messageHtml: string = 'Estou muito contente de ter você por aqui! Esse é o começo de uma <b>comunidade de desenvolvimento de software de excelência</b>. <br> <br>' +
'Conto contigo para construirmos <i>a melhor plataforma de treinamento de desenvolvedores do Brasil</i>. <br> <br>' +
'Enquanto isso, fique com esse pequeno presente que preparamos para você com muito carinho: um pôster da <b>Clean Architecture</b>! <br> <br>' +
'Tenho certeza que você vai curtir! <br> <br>' +
'Um abraço e até a próxima, <br>' +
'<b>Otávio Lemos | theWiseDev</b> <br> <br> '

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async sendEmailToUserWithBonus (userData: UserData): Promise<SendEmailResponse> {
    const user = new User(userData)
    this.mailOptions.to = user.name + '<' + user.email + '>'
    const originalHtml = messageHtml
    let greetings = ''
    greetings = 'E aí <b>' + user.name + '</b>, beleza?'
    const customizedHtml = greetings + '<br> <br>' + originalHtml
    this.mailOptions.html = customizedHtml
    const sent = await this.mailService.send(this.mailOptions)
    this.mailOptions.html = originalHtml
    if (!(sent instanceof Error)) {
      return right(Result.ok())
    }
    return left(new MailServiceError())
  }
}
