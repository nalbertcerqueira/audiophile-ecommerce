import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { AddCheckoutOrderRepository } from "../../repositories/order/addCheckoutOrderRepository"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { CreateOrderInputDTO } from "./orderDTOs"

export class DbCreateCheckoutOrderUseCase {
    constructor(
        private readonly getCartRepository: GetCartRepository,
        private readonly clearCartRepository: ClearCartRepository,
        private readonly addCheckoutOrderRepository: AddCheckoutOrderRepository
    ) {}

    public async execute(data: CreateOrderInputDTO): Promise<CheckoutOrder | null> {
        const { user, customer } = data
        const foundCart = await this.getCartRepository.getCartById(user)
        const cartProps = foundCart?.toJSON()

        if (!foundCart || !cartProps?.items) {
            return null
        }

        const taxes = {
            vat: CheckoutOrder.calculateVAT(foundCart.calculateTotalSpent()),
            shipping: CheckoutOrder.calculateShipping()
        }

        const order = new CheckoutOrder({
            customer: customer,
            cart: foundCart.toJSON(),
            taxes
        })
        const isCheckoutCreated = await this.addCheckoutOrderRepository.add(
            { id: user.id, type: user.type },
            order
        )

        if (!isCheckoutCreated) {
            return null
        }

        await this.clearCartRepository.clearCartById({ id: user.id, type: user.type })
        return order
    }
}
