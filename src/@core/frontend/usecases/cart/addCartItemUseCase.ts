import { Cart, CartProps, createCart } from "@/@core/shared/entities/cart/cart"
import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"
import { CartProduct } from "../../../shared/entities/cart/cartItem"
import { UpdateCartItemGateway } from "../../domain/gateways/cart/updateCartItemGateway"

interface AddItemInputDTO {
    cartProps: CartProps
    itemRef: Pick<CartProduct, "productId" | "quantity">
}

export class AddCartItemUseCase {
    constructor(
        private readonly updateCartItemGateway: UpdateCartItemGateway,
        private readonly addCartItemGateway: AddCartItemGateway
    ) {}

    public async execute(data: AddItemInputDTO): Promise<Cart | null> {
        const { cartProps, itemRef } = data

        if (itemRef.quantity < 1) {
            return null
        }

        const cart = createCart({ items: cartProps.items })
        const modifiedItem = cart.addItem(itemRef.productId, itemRef.quantity)

        if (!modifiedItem) {
            return await this.addCartItemGateway.addItem(itemRef.productId, itemRef.quantity)
        }

        return await this.updateCartItemGateway.updateItem({
            productId: itemRef.productId,
            quantity: modifiedItem.quantity
        })
    }
}
