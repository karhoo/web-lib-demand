declare namespace braintree {
  export interface Client {
    teardown(): Promise<void> | void
  }
}
