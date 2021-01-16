import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: () => {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  let eValAdpt: EmailValidatorAdapter
  beforeEach(() => {
    eValAdpt = new EmailValidatorAdapter()
  })

  it('should return true if validator returns true', () => {
    const isValid = eValAdpt.isValid('valid_email@mail.com')
    expect(isValid).toBeTruthy()
  })

  it('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = eValAdpt.isValid('invalid-email@mail.com')
    expect(isValid).toBeFalsy()
  })

  it('should call validator with correct email', () => {
    const mock = jest.spyOn(validator, 'isEmail')
    eValAdpt.isValid('anyEmail@mail.com')
    expect(mock).toHaveBeenCalledWith('anyEmail@mail.com')
  })
})
