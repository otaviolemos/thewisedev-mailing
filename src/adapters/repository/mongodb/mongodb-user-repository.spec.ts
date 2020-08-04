import { MongoHelper } from './helpers/mongo-helper'
import { MongodbUserRepository } from './mongodb-user-repository'

describe('User Mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
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

  test('when user is added, it should exist', async () => {
    const sut = new MongodbUserRepository()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(await sut.exists('any_email@mail.com')).toBeTruthy()
  })

  test('when user is not added, it should not exist', async () => {
    const sut = new MongodbUserRepository()
    expect(await sut.exists('any_email@mail.com')).toBeFalsy()
  })
})
