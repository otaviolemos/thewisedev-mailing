export class ExistingUserError extends Error implements UsecaseError {
  constructor () {
    super('User already registered.')
    this.name = 'ExistingUserError'
  }
}
