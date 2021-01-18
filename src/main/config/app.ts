import express from 'express'
import middlewareSetups from './middlewares'

const app = express()
middlewareSetups(app)
export default app
