import { InvalidParamError } from './errors/invalid-param-error'
import { validateName, validateString } from './validators'

export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (name: string): Name | InvalidParamError {
    if (!validateString(name) || !validateName(name)) {
      return new InvalidParamError('name')
    }
    return new Name(name)
  }

  get value (): string {
    return this.name
  }
}
