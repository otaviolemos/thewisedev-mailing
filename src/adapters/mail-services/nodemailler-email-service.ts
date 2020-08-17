import { EmailService, EmailOptions } from '../../usecases/ports/email-service'
import * as nodemailer from 'nodemailer'

export class NodemailerEmailService implements EmailService {
  async send (options: EmailOptions): Promise<any> {
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
