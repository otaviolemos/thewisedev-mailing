import { MailService, MailOptions } from '../../usecase/port/mail-service'
import config from '../../config/config'
import * as nodemailer from 'nodemailer'

export class NodemailerMailService implements MailService {
  async send (options: MailOptions): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('gmailcredentials.username'),
        pass: config.get('gmailcredentials.password')
      }
    })

    try {
      await transporter.sendMail(options)
    } catch (error) {
      return error
    }
    return true
  }
}
