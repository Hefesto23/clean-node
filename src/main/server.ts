import { MongoHelper } from './../infra/mongodb/mongo-helper'
import app from './config/app'
import dotenv from 'dotenv'

dotenv.config()

async function bootstrap (): Promise<void> {
  try {
    await MongoHelper.connect((process.env.MONGO_URL).toString())
    await app.listen(process.env.SERVER_PORT, () => console.log(`Server running in localhost: ${process.env.SERVER_PORT}`))
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
