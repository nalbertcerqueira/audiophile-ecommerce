import { Cart, CartProps, createCart } from "../../../shared/entities/cart/cart"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { UpdateCartItemGateway } from "../../domain/gateways/cart/updateCartItemGateway"

interface RemoveItemInputDTO {
    cartProps: CartProps
    itemRef: Pick<CartProduct, "productId" | "quantity">
}

export class RemoveCartItemUseCase {
    constructor(private readonly updateCartItemGateway: UpdateCartItemGateway) {}

    public async execute(data: RemoveItemInputDTO): Promise<Cart | null> {
        const { cartProps, itemRef } = data

        if (itemRef.quantity < 1) {
            return null
        }

        const cart = createCart({ items: cartProps.items })
        const removedItem = cart.removeItem(itemRef.productId, itemRef.quantity)
        const quantity = removedItem?.quantity ?? 0

        return await this.updateCartItemGateway.updateItem({
            productId: itemRef.productId,
            quantity
        })
    }
}
