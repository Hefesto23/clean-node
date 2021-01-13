import { HttpRequest, HttpResponse } from '../dtos/http'

export interface IController {
  handle: (httpRequest: HttpRequest) => HttpResponse
}
