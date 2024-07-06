import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"
import { CartProduct } from "../../../shared/entities/cart/cartItem"
import { Cart } from "@/@core/shared/entities/cart/cart"

type AddItemInputDTO = Pick<CartProduct, "productId" | "quantity">

export class AddCartItemUseCase {
    constructor(private readonly addCartItemGateway: AddCartItemGateway) {}

    public async execute(item: AddItemInputDTO): Promise<Cart | null> {
        const { productId, quantity } = item

        if (quantity < 1) {
            return null
        }

        const cart = await this.addCartItemGateway.addItem(productId, quantity)
        return cart
    }
}
