import { makeSignUpController } from './../controllers-factory/signup'
import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-route.adapter'

export default (router: Router): void => {
  router.get('/', (req, res) => { res.send('Server UP!') })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
