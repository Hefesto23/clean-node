export class ServerError extends Error {
  constructor () {
    super('INTERNAL SERVER ERROR')
    this.name = 'ServerError'
  }
}
