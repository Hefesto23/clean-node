import { IController } from './controller'
import { badRequest } from './../errors/bad-request'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController implements IController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
