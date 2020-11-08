import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../external/repositories/mongodb/helpers/mongo-helper'

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
  }, 20000)
})
