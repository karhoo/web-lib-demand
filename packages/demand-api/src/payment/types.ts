export type CreateTokenParams = {
  organisation_id: string
  currency: string
}

export type CreateTokenResponse = {
  token?: string
}

export type ClientNonceParams = {
  payer: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
  organisation_id: string
}

export type ClientNonceResponse = {
  nonce?: string
  last_four?: string
  card_type?: string
}

export interface AddPaymentCardParams extends ClientNonceParams {
  nonce: string
}
