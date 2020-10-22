export class InvalidEmailError extends Error implements DomainError {
  public constructor (email: string) {
    super(`The email "${email}" is invalid.`)
  }

  public static create (email: string): InvalidEmailError {
    return new InvalidEmailError(email)
  }
}
