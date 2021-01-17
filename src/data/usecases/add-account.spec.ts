import { Encrypter } from '../dtos/encrypter'
import { DbAddAccount } from './add-account'

describe('DbAddAccount Usecase', () => {
  let dbAddAccount: DbAddAccount
  let encrypterStub: EncrypterStub
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_value'))
    }
  }

  beforeEach(() => {
    encrypterStub = new EncrypterStub()
    dbAddAccount = new DbAddAccount(encrypterStub)
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
})
