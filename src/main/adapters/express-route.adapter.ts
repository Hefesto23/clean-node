import { HttpRequest } from './../../presentation/dtos/http'
import { IController } from '../../presentation/controllers/controller'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
