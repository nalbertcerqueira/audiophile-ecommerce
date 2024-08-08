import { CartItem } from "@/@core/shared/entities/cart/cartItem"
import { ClearCartRepository } from "../../repositories/cart/clearCartRepository"
import { MoveCartItemsInputDTO } from "./cartDTOs"
import { AddCartItemsRepository } from "../../repositories/cart/addCartItemsRepository"
import { GetProductsByIdRepository } from "../../repositories/product/getProductsByIdRepository"

export class DbMoveCartItemsUseCase {
    constructor(
        private readonly getProductsByIdRepository: GetProductsByIdRepository,
        private readonly addCartItemsRepository: AddCartItemsRepository,
        private readonly clearCartRepository: ClearCartRepository
    ) {}

    public async execute(data: MoveCartItemsInputDTO): Promise<void> {
        const { from, to, itemRefs } = data
        const ids = []
        const itemMap: Record<string, number> = {}

        if (!itemRefs.length) {
            return
        }

        for (const { productId, quantity } of itemRefs) {
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
            this.addCartItemsRepository.addItems({ id: to.id, type: to.type }, cartItems),
            this.clearCartRepository.clearCart({
                id: from.id,
                type: from.type
            })
        ])
    }
}
