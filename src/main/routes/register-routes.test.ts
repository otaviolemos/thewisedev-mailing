import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../adapters/repositories/mongodb/helpers/mongo-helper'

describe('Register Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MongoHelper.clearCollection('users')
  })

  test('should return an account on success', async () => {
    jest.setTimeout(10000)
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'Otavio Lemos',
        email: 'otaviolemos@gmail.com'
      })
      .expect(200)
  })
})
