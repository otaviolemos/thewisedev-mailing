
export interface EmailOptions {
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

export interface EmailService {
  send: (options: EmailOptions) => Promise<any>
}
