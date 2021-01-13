import { badRequest } from './../errors/bad-request'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return badRequest(new MissingParamError('name'))
    }

    if (httpRequest.body.email === undefined) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
