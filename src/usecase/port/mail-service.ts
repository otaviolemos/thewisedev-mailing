
export interface MailOptions {
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachments: Object[]
}

export interface MailService {
  send: (options: MailOptions) => Promise<boolean>
}
