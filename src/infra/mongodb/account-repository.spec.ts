import { AccountMongoRepository } from './account-repository'
import { MongoHelper } from './mongo-helper'

describe('Account Mongo Repository', () => {
  let accMongoRepo: AccountMongoRepository

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(() => {
    accMongoRepo = new AccountMongoRepository()
  })

  it('Should return an account on success', async () => {
    const account = await accMongoRepo.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual('any_name')
    expect(account.email).toEqual('any_email')
    expect(account.password).toEqual('any_password')
  })
})
