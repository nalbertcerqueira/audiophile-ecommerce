import { Cart, CartProps } from "../../../shared/entities/cart/cart"
import { CartItem, CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { UpdateCartItemGateway } from "../../domain/gateways/cart/updateCartItemGateway"

interface RemoveItemInputDTO {
    cartProps: CartProps
    item: Pick<CartProduct, "productId" | "quantity">
}

export class RemoveCartItemUseCase {
    constructor(private readonly updateCartItemGateway: UpdateCartItemGateway) {}

    public async execute(data: RemoveItemInputDTO): Promise<Cart | null> {
        const { cartProps, item } = data

        if (item.quantity < 1) {
            return null
        }

        const cart = new Cart({ items: cartProps.items.map((item) => new CartItem(item)) })
        const removedItem = cart.removeItem(item.productId, item.quantity)
        const quantity = removedItem?.quantity ?? 0

        return await this.updateCartItemGateway.updateItem({
            productId: item.productId,
            quantity
        })
    }
}
