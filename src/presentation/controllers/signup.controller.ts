import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (httpRequest.body.email === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
