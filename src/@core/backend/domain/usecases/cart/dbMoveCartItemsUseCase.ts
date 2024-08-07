import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { MoveCartItemsInputDTO } from "./cartDTOs"
import { GetProductsByIdRepository } from "../../repositories/product/getProductsByIdRepository"
import { AddManyCartItemsRepository } from "../../repositories/cart/addManyCartItemsRepository"

export class DbMoveCartItemsUseCase {
    constructor(
        private readonly getProductsByIdRepository: GetProductsByIdRepository,
        private readonly addManyCartItemsRepository: AddManyCartItemsRepository,
        private readonly clearCartRepository: ClearCartRepository
    ) {}

    public async execute(data: MoveCartItemsInputDTO): Promise<void> {
        const { from, to, items } = data
        const ids = []
        const itemMap: Record<string, number> = {}

        if (!items.length) {
            return
        }

        for (const { productId, quantity } of items) {
            itemMap[productId] = quantity
            ids.push(productId)
        }

        const foundProducts = await this.getProductsByIdRepository.getProductsByIds(
            ids,
            "shortProduct"
        )

        if (!foundProducts.length) {
            return
        }

        const cartItems = foundProducts.map((item) => {
            return new CartItem({ ...item, quantity: itemMap[item.productId] })
        })

        await Promise.all([
            this.addManyCartItemsRepository.addManyItems(
                { id: to.id, type: to.type },
                cartItems
            ),
            this.clearCartRepository.clearCart({
                id: from.id,
                type: from.type
            })
        ])
    }
}
