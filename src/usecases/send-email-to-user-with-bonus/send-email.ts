import { SendEmailResponse } from './send-email-response'
import { User } from '../../domain/user'

export interface SendEmail {
  sendEmailToUserWithBonus: (user: User) => Promise<SendEmailResponse>
}
