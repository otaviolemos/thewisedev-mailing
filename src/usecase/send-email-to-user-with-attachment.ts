import { MailService } from './port/mail-service'

export class SendEmailToUserWithAttachment {
  constructor (public mailService: MailService) {}

  async sendEmailToUserWithAttachment (mailInfo: Object): Promise<boolean> {
    return await this.mailService.send(mailInfo)
  }
}
