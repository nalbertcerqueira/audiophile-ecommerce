import { Cart, CartProduct } from "../../../shared/entities/cart/cart"
import { RemoveCartItemGateway } from "../../domain/gateways/cart/removeCartItemGateway"

type ItemToRemove = Pick<CartProduct, "productId" | "quantity">

export class RemoveCartItemUseCase {
    constructor(private readonly removeCartItemGateway: RemoveCartItemGateway) {}

    public async execute(item: ItemToRemove): Promise<Cart> {
        const { productId, quantity } = item
        const cart = await this.removeCartItemGateway.removeItem(productId, quantity)

        return cart
    }
}
