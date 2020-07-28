import { MailService, MailOptions } from '../../usecase/port/mail-service'
import config from '../../config/config'
import * as nodemailer from 'nodemailer'

// TODO: fix bug - attachment is not working

export class NodemailerMailService implements MailService {
  async send (options: MailOptions): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: config.get('email.service'),
      auth: {
        user: config.get('email.username'),
        pass: config.get('email.password')
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
