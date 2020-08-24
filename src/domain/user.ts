import { UserData } from './user-data'

export class User {
  public readonly props: UserData
  constructor (userData: UserData) {
    this.props = userData
  }
}
