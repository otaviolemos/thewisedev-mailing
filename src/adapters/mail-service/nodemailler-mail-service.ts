import { MailService, MailOptions } from '../../usecases/port/mail-service'
import * as nodemailer from 'nodemailer'

export class NodemailerMailService implements MailService {
  async send (options: MailOptions): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      auth: {
        user: options.username,
        pass: options.password
      }
    })

    var info
    try {
      info = await transporter.sendMail(options)
    } catch (error) {
      return error
    }
    return info
  }
}
