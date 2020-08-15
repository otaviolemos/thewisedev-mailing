export class ServerError extends Error {
  constructor (reason: string) {
    super('Server error: ' + reason + '.')
    this.name = 'ServerError'
  }
}
