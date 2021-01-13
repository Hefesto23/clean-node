import { InvalidParamError } from './../errors/invalid-param-error'
import { EmailValidator } from './../validator/email-validator'
import { IController } from './controller'
import { badRequest } from './../errors/bad-request'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController implements IController {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
