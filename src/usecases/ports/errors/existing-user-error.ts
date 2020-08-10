export class ExistingUserError extends Error {
  constructor () {
    super('User already registered.')
    this.name = 'ExistingUserError'
  }
}
