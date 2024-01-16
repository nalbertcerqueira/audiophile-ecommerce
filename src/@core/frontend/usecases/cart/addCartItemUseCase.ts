import { Cart, CartProduct } from "../../../shared/entities/cart/cart"
import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"

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
