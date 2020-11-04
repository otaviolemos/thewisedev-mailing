import { MongoHelper } from './helpers/mongo-helper'
import { MongodbUserRepository } from './mongodb-user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
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

  test('find all should return all added users', async () => {
    const sut = new MongodbUserRepository()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    await sut.add({
      name: 'a_second_name',
      email: 'a_second_email@mail.com'
    })
    const users = await sut.findAllUsers()
    expect(users[0].name).toEqual('any_name')
    expect(users[1].name).toEqual('a_second_name')
  })
})
