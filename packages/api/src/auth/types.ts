export type LoginParams = {
  username: string
  password: string
}

export type LoginResponse = {
  access_token: string
  expires_in: number
  refresh_token?: string
}

export type RefreshTokenParams = {
  refresh_token: string
}

export type RefreshTokenResponse = {
  access_token: string
  expires_in: number
}
