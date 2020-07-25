export class User {
  public readonly name: string
  public readonly email: string

  constructor (username: string, useremail: string) {
    this.name = username
    this.email = useremail
  }
}
