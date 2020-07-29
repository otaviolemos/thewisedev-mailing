import { MailService, MailOptions } from '../../usecase/port/mail-service'
import * as nodemailer from 'nodemailer'

export class NodemailerMailService implements MailService {
  async send (options: MailOptions): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: options.service,
      auth: {
        user: options.username,
        pass: options.password
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
