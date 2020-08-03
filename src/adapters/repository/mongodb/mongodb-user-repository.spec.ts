import { MongoHelper } from './helpers/mongo-helper'
import { MongodbUserRepository } from './mongodb-user-repository'

describe('User Mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should add user', async () => {
    const sut = new MongodbUserRepository()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    const user = await sut.findUserByEmail('any_email@mail.com')
    expect(user.name).toEqual('any_name')
  })
})
