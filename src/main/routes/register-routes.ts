/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeRegisterUserController } from '../factories/register'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
