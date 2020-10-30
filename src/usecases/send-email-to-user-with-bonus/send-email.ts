import { SendEmailResponse } from './send-email-response'
import { UserData } from '../../entities/user-data'

export interface SendEmail {
  sendEmailToUserWithBonus: (user: UserData) => Promise<SendEmailResponse>
}
