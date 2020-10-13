import { InvalidParamError } from './errors/invalid-param-error'
import { validateName } from './validators'

export class Name {
  private readonly name: string

  constructor (name: string) {
    if (!validateName(name)) {
      throw new InvalidParamError('name')
    }
    this.name = name
  }

  get value (): string {
    return this.name
  }
}
