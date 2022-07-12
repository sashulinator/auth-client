export interface LoginResponse {
  role: string
  email: string
}

export interface RegisterResponse {
  email: string
  role: null
}

export interface Transfer<Data> {
  meta: {
    code: number
  }
  dataBlock: Data
}
