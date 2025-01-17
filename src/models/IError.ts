export interface FormError {
  field: string
  message: string
}

export interface ResponseError {
  name: string
  message: string
  code: number
  status: number
  type: string
}
