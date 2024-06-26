import { UserInfo } from "../../protocols"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { CheckoutOrder, Taxes } from "@/@core/shared/entities/order/checkoutOrder"

export class DbGetOrderTaxesUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(user: UserInfo): Promise<Taxes> {
        const { id, type } = user
        const foundCart = await this.getCartRepository.getCartById({ id, type })

        if (!foundCart) {
            return { vat: 0, shipping: 0 }
        }

        return {
            vat: CheckoutOrder.calculateVAT(foundCart.calculateTotalSpent()),
            shipping: CheckoutOrder.calculateShipping()
        }
    }
}
