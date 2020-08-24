import { SendEmailResponse } from './send-email-response'
import { UserData } from '../../domain/user'

export interface SendEmail {
  sendEmailToUserWithBonus: (user: UserData) => Promise<SendEmailResponse>
}
