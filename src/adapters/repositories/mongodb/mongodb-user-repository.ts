import { UserRepository } from '../../../usecases/port/user-repository'
import { User } from '../../../domain/user'
import { MongoHelper } from './helpers/mongo-helper'

export class MongodbUserRepository implements UserRepository {
  async findAllUsers (): Promise<User[]> {
    return await MongoHelper.getCollection('users').find().toArray()
  }

  async findUserByEmail (email: string): Promise<User> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email: email })
    return result
  }

  async add (user: User): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    if (result != null) {
      if (result.email === email) {
        return true
      }
    }
    return false
  }
}
