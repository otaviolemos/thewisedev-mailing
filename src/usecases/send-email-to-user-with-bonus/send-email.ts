import { SendEmailResponse } from './send-email-response'
import { UserData } from '../model/user'

export interface SendEmail {
  sendEmailToUserWithBonus: (user: UserData) => Promise<SendEmailResponse>
}
