import { AddAccount } from './../../domain/usecases/add-account'
import { serverError, badRequest } from './../errors/errors-helper'
import { InvalidParamError, MissingParamError } from './../errors'
import { EmailValidator } from './../validator/email-validator'
import { IController } from './controller'
import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController implements IController {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      // this.logger(error)
      return serverError()
    }
  }
}
