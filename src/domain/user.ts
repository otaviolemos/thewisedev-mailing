interface UserProps {
  email: string
  name: string
}

export class User {
  public readonly props: UserProps

  constructor (username: string, useremail: string) {
    this.props.name = username
    this.props.email = useremail
  }

  get email (): string {
    return this.props.email
  }

  get name (): string {
    return this.props.name
  }
}
