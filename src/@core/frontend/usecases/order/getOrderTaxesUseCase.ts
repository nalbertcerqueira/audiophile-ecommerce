import { Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import { GetOrderTaxesGateway } from "../../domain/gateways/order/getOrderTaxesGateway"

export class GetOrderTaxesUseCase {
    constructor(private readonly getOrderTaxesGateway: GetOrderTaxesGateway) {}

    public async execute(): Promise<Taxes> {
        const taxes = await this.getOrderTaxesGateway.getTaxes()

        return taxes
    }
}
