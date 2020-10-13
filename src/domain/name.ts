import { InvalidParamError } from './errors/invalid-param-error'
import { validateName, validateString } from './validators'

export class Name {
  private readonly name: string

  constructor (name: string) {
    if (!validateString(name) || !validateName(name)) {
      throw new InvalidParamError('name')
    }
    this.name = name
  }

  get value (): string {
    return this.name
  }
}
