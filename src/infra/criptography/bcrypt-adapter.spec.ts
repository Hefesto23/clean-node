import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (value: string, salt: number): Promise<string> => {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('Bcrypt Adapter', () => {
  let bcryptAdapter: BcryptAdapter

  beforeEach(() => {
    const salt = 12
    bcryptAdapter = new BcryptAdapter(salt)
  })

  it('should call bcrypt with correct value', async () => {
    jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt('any_value')
    expect(bcrypt.hash).toBeCalledWith('any_value', 12)
  })

  it('should return one hash on success', async () => {
    const encryptedValue = await bcryptAdapter.encrypt('any_value')
    expect(encryptedValue).toBe('hashed_value')
  })
})
