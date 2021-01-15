export interface HttpResponse {
  statusCode: number
  body: any
}
export interface HttpRequest {
  body?: any
}

export const successResponse = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
