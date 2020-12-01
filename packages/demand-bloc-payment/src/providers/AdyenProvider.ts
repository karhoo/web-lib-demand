import AdyenCheckout from '@adyen/adyen-web'

import { Payment } from '../../../demand-api/dist/index'

export class AdyenProvider {
    private paymentService: Payment

    constructor(paymentService: Payment) {
        this.paymentService = paymentService
    }

    async initialize() {
        const originKey = await this.paymentService.getAdyenOriginKey().then((key: any) => key.body)
        const data = await this.paymentService.getAdyenOriginKey().then(() => this.paymentService.getAdyenPaymentMethods({})).then((data: any) => data.body)

        const checkout = new AdyenCheckout({ ...data, originKey })
        checkout.create('dropin').mount('#root')
    }
}