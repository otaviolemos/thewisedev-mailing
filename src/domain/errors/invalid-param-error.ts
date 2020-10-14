export class InvalidParamError extends Error {
  private readonly _paramName: string
  constructor (paramName: string) {
    super('Invalid param: ' + paramName)
    this.name = 'InvalidParamError'
    this._paramName = paramName
  }

  get paramName (): string {
    return this._paramName
  }
}
