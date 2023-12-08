import { Cart } from "../../../shared/entities/cart/cart"
import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"

type ItemToAdd = {
    productId: string
    quantity: number
}

export class AddCartItemUseCase {
    constructor(private readonly addCartItemGateway: AddCartItemGateway) {}

    public async execute(item: ItemToAdd): Promise<Cart> {
        const newCart = await this.addCartItemGateway.addItem(item.productId, item.quantity)

        return newCart
    }
}
