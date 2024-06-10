import { CheckoutOrder, Customer } from "@/@core/shared/entities/order/checkoutOrder"
import { AddCheckoutOrderRepository } from "../../repositories/order/addCheckoutOrderRepository"
import { UserInfo } from "../../protocols"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"

export class DbCreateCheckoutOrderUseCase {
    constructor(
        private readonly getCartRepository: GetCartRepository,
        private readonly clearCartRepository: ClearCartRepository,
        private readonly addCheckoutOrderRepository: AddCheckoutOrderRepository
    ) {}

    public async execute(user: UserInfo, customer: Customer): Promise<CheckoutOrder | null> {
        const { id, type } = user
        const foundCart = await this.getCartRepository.getCartById({ id, type })
        const cartProps = foundCart?.toJSON()

        if (!foundCart || !cartProps?.items) {
            return null
        }

        const taxes = {
            vat: CheckoutOrder.calculateVAT(foundCart.getTotalSpent()),
            shipping: CheckoutOrder.calculateShipping()
        }

        const order = new CheckoutOrder({
            customer: customer,
            cart: foundCart.toJSON(),
            taxes
        })
        const isCheckoutCreated = await this.addCheckoutOrderRepository.add(
            { id, type },
            order
        )

        if (!isCheckoutCreated) {
            return null
        }

        await this.clearCartRepository.clearCartById({ id, type })
        return order
    }
}
