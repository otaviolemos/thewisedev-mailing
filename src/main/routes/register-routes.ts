import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
