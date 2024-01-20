import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { AddCheckoutOrderRepository } from "../../repositories/order/addCheckoutOrderRepository"
import { UserInfo } from "../protocols"
import { CheckoutInfo } from "./protocols"

export class CreateCheckoutOrderUseCase {
    constructor(private readonly addCheckoutOrderRepository: AddCheckoutOrderRepository) {}

    public async execute(userInfo: UserInfo, checkout: CheckoutInfo): Promise<void> {
        const { id, type } = userInfo
        const order = new CheckoutOrder({
            cartItems: checkout.cartItems,
            costumer: checkout.costumer
        })

        await this.addCheckoutOrderRepository.add(id, type, order)
    }
}
