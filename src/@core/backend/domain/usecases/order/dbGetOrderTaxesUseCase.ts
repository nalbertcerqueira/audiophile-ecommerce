import { CheckoutOrder, Taxes } from "@/@core/shared/entities/order/checkoutOrder"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { UserInfo } from "../protocols"

export class DbGetOrderTaxesUseCase {
    constructor(private readonly getCartRepository: GetCartRepository) {}

    public async execute(userInfo: UserInfo): Promise<Taxes> {
        const { id, type } = userInfo
        const foundCart = await this.getCartRepository.getCartById(id, type)

        if (!foundCart) {
            return { vat: 0, shipping: 0 }
        }

        const { items } = foundCart.toJSON()
        const order = new CheckoutOrder({ cartItems: items, costumer: null })

        return {
            vat: order.calculateVAT(),
            shipping: order.calculateShipping()
        }
    }
}
