import { Cart, CartProduct } from "../../../shared/entities/cart/cart"
import { RemoveCartItemGateway } from "../../domain/gateways/cart/removeCartItemGateway"

type RemoveItemInputDTO = Pick<CartProduct, "productId" | "quantity">

export class RemoveCartItemUseCase {
    constructor(private readonly removeCartItemGateway: RemoveCartItemGateway) {}

    public async execute(item: RemoveItemInputDTO): Promise<Cart | null> {
        const { productId, quantity } = item

        if (quantity < 1) {
            return null
        }

        const cart = await this.removeCartItemGateway.removeItem(productId, quantity)
        return cart
    }
}
