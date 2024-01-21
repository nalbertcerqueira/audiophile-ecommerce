import { CheckoutOrder, Costumer } from "@/@core/shared/entities/order/checkoutOrder"
import { AddCheckoutOrderRepository } from "../../repositories/order/addCheckoutOrderRepository"
import { UserInfo } from "../protocols"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"

export class DbCreateCheckoutOrderUseCase {
    constructor(
        private readonly getCartRepository: GetCartRepository,
        private readonly clearCartRepository: ClearCartRepository,
        private readonly addCheckoutOrderRepository: AddCheckoutOrderRepository
    ) {}

    public async execute(userInfo: UserInfo, costumer: Costumer): Promise<void> {
        const { id, type } = userInfo
        const foundCart = await this.getCartRepository.getCartById(id, type)
        const cartProps = foundCart?.toJSON()

        if (!foundCart || !cartProps?.items) {
            return
        }

        const order = new CheckoutOrder({ cartItems: cartProps.items, costumer: costumer })
        const isCheckoutCreated = await this.addCheckoutOrderRepository.add(id, type, order)

        if (isCheckoutCreated) {
            await this.clearCartRepository.clearCartById(id, type)
        }
    }
}
