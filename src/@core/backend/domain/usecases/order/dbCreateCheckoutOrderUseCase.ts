import { CheckoutOrder } from "@/@core/shared/entities/order/checkoutOrder"
import { AddCheckoutOrderRepository } from "../../repositories/order/addCheckoutOrderRepository"
import { GetCartRepository } from "../../repositories/cart/getCartRepository"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { CreateOrderInputDTO } from "./orderDTOs"
import { TransactionManager } from "../../services/transactionManager"

export class DbCreateCheckoutOrderUseCase {
    constructor(
        private readonly transactionManager: TransactionManager,
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
            items: foundCart.toJSON().items,
            taxes
        })

        this.transactionManager.startTransaction()

        try {
            await this.addCheckoutOrderRepository.add({ id: user.id, type: user.type }, order)
            await this.clearCartRepository.clearCartById({ id: user.id, type: user.type })

            await this.transactionManager.commit()
        } catch (error: any) {
            await this.transactionManager.rollback()
            throw error
        }

        return order
    }
}
