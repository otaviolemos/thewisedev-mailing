export interface MailService {
  send: (mailOptions: Object) => Promise<boolean>
}
