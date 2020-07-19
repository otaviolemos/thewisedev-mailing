import { MailService } from './port/mail-service'

export class SendEmailToUserWithAttachment {
  constructor (public mailService: MailService) {}

  sendEmailToUserWithAttachment (mailInfo: Object): boolean {
    return this.mailService.send(mailInfo)
  }
}
