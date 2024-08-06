import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"
import { CartItem, CartProduct } from "../../../shared/entities/cart/cartItem"
import { UpdateCartItemGateway } from "../../domain/gateways/cart/updateCartItemGateway"

interface AddItemInputDTO {
    cartProps: CartProps
    item: Pick<CartProduct, "productId" | "quantity">
}

export class AddCartItemUseCase {
    constructor(
        private readonly updateCartItemGateway: UpdateCartItemGateway,
        private readonly addCartItemGateway: AddCartItemGateway
    ) {}

    public async execute(data: AddItemInputDTO): Promise<Cart | null> {
        const { cartProps, item } = data

        if (item.quantity < 1) {
            return null
        }

        const cart = new Cart({ items: cartProps.items.map((item) => new CartItem(item)) })
        const modifiedItem = cart.addItem(item.productId, item.quantity)

        if (!modifiedItem) {
            return await this.addCartItemGateway.addItem(item.productId, item.quantity)
        }

        return await this.updateCartItemGateway.updateItem({
            productId: item.productId,
            quantity: modifiedItem.quantity
        })
    }
}
