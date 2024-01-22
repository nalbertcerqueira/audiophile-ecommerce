import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { createCheckoutOrderGateway } from "../../domain/gateways/order/createCheckoutOrderGateway"

export class CreateCheckoutOrderUseCase {
    constructor(private readonly createCheckoutOrderGateway: createCheckoutOrderGateway) {}

    public async execute(): Promise<CheckoutOrder> {
        const order = await this.createCheckoutOrderGateway.create()

        return order
    }
}
