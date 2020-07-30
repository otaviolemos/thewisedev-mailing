
export interface MailOptions {
  host: string
  port: number
  username: string
  password: string
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachments: Object[]
}

export interface MailService {
  send: (options: MailOptions) => Promise<any>
}
