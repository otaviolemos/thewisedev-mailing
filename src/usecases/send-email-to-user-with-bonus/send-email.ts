import { SendEmailResponse } from './send-email-response'
import { UserData } from '../../domain/user-data'

export interface SendEmail {
  sendEmailToUserWithBonus: (user: UserData) => Promise<SendEmailResponse>
}
