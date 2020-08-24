import express from 'express'
import setupMiddleware from './middleware'
import setupRoutest from './routes'

const app = express()
setupMiddleware(app)
setupRoutest(app)
export default app
