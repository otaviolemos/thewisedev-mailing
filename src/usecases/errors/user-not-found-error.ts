export class UserNotFoundError extends Error implements UsecaseError {
  constructor () {
    super('User not found.')
    this.name = 'UserNotFoundError'
  }
}
