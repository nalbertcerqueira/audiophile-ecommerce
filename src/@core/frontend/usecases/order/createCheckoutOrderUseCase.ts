import { createCheckoutOrderGateway } from "../../domain/gateways/order/createCheckoutOrderGateway"

export class CreateCheckoutOrderUseCase {
    constructor(private readonly createCheckoutOrderGateway: createCheckoutOrderGateway) {}

    public async execute(): Promise<void> {
        await this.createCheckoutOrderGateway.create()
    }
}
