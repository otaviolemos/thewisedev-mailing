import request from 'supertest'
import app from '../config/app'

describe('Register Routes', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'Otavio',
        email: 'otaviolemos@gmail.com'
      })
      .expect(200)
  })
})
