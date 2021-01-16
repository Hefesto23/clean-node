import { EmailValidatorAdapter } from './email-validator-adapter'

describe('Email Validator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const eValAdpt = new EmailValidatorAdapter()
    const isValid = eValAdpt.isValid('invalid-email@mail.com')
    expect(isValid).toBeFalsy()
  })
})
