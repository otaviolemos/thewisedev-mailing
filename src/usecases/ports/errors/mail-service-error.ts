export class MailServiceError extends Error {
  constructor () {
    super('Mail service error.')
    this.name = 'MailServiceError'
  }
}
