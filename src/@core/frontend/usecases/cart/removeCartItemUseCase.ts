import { Cart, CartProduct } from "../../../shared/entities/cart/cart"
import { RemoveCartItemGateway } from "../../domain/gateways/cart/removeCartItemGateway"

type ItemToRemove = Pick<CartProduct, "productId" | "quantity">

export class RemoveCartItemUseCase {
    constructor(private readonly removeCartItemGateway: RemoveCartItemGateway) {}

    public async execute(item: ItemToRemove): Promise<Cart | null> {
        const { productId, quantity } = item

        if (quantity < 1) {
            return null
        }

        const cart = await this.removeCartItemGateway.removeItem(productId, quantity)
        return cart
    }
}
