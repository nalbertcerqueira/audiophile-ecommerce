import { CheckoutOrder, Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { UserInfo } from "../protocols"

export class DbGetOrderTaxesUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(userInfo: UserInfo): Promise<Taxes> {
        const { userId, type } = userInfo
        const foundCart = await this.getCartRepository.getCartById({ userId, type })

        if (!foundCart) {
            return { vat: 0, shipping: 0 }
        }

        return {
            vat: CheckoutOrder.calculateVAT(foundCart.getTotalSpent()),
            shipping: CheckoutOrder.calculateShipping()
        }
    }
}
