import { HttpRequest, HttpResponse } from './../dtos/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: {}
    }
  }
}
