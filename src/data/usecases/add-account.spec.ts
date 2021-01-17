import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add-account'
import { AddAccountRepository } from '../dtos/add-account-repo'
import { Encrypter } from '../dtos/encrypter'
import { DbAddAccount } from './add-account'

describe('DbAddAccount Usecase', () => {
  let dbAddAccount: DbAddAccount
  let encrypterStub: EncrypterStub
  let addAccountRepositoryStub: AddAccountRepositoryStub
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_value'))
    }
  }

  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const accountExample = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_value'
      }
      return await new Promise(resolve => resolve(accountExample))
    }
  }

  beforeEach(() => {
    addAccountRepositoryStub = new AddAccountRepositoryStub()
    encrypterStub = new EncrypterStub()
    dbAddAccount = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  })

  it('should call encrypter with correct password', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const encSpy = jest.spyOn(encrypterStub, 'encrypt')
    await dbAddAccount.add(accountData)
    expect(encSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw encrypter error', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockRejectedValueOnce(new Error('encrypter error'))
    const promiseError = dbAddAccount.add(accountData)
    await expect(promiseError).rejects.toThrowError('encrypter error')
  })

  it('should call addAccountRepository with correct data', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await dbAddAccount.add(accountData)
    accountData.password = 'hashed_value'
    expect(addSpy).toHaveBeenCalledWith(accountData)
  })

  it('should throw addAccountRepository error', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error('addAccountRepository error'))
    const promiseError = dbAddAccount.add(accountData)
    await expect(promiseError).rejects.toThrowError('addAccountRepository error')
  })

  it('should return expected value', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const newAccount = await dbAddAccount.add(accountData)
    expect(newAccount).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_value'
    })
  })
})
