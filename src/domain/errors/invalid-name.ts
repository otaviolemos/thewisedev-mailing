export class InvalidNameError extends Error implements DomainError {
  public constructor (name: string) {
    super(`The name "${name}" is invalid.`)
  }

  public static create (name: string): InvalidNameError {
    return new InvalidNameError(name)
  }
}
