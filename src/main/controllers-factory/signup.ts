import { BcryptAdapter } from './../../infra/cryptography/bcrypt-adapter'
import { DbAddAccount } from './../../data/usecases/add-account'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup.controller'
import { AccountMongoRepository } from '../../infra/mongodb/account-repository'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dbAddAccount = new DbAddAccount(new BcryptAdapter(12), new AccountMongoRepository())
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
