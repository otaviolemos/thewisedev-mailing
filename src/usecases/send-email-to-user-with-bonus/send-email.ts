import { MailOptions } from '../ports/mail-service'
import { SendEmailResponse } from './send-email-response'

export interface SendEmail {
  sendEmailToUserWithBonus: (options: MailOptions) => Promise<SendEmailResponse>
}
