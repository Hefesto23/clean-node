import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

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
})
