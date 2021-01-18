import { MongoHelper } from './mongo-helper'
import { AddAccountRepository } from './../../data/dtos/add-account-repo'
import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add-account'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
