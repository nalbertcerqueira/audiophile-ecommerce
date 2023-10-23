import { Cart } from "../../../shared/entities/cart"
import { GetCartItemGateway } from "../../domain/gateways/getCartItemGateway"

export class GetCartUseCase {
    constructor(private readonly cartGateway: GetCartItemGateway) {}

    public async execute(): Promise<Cart> {
        const cartItems = await this.cartGateway.getAll()

        const validItems = cartItems.filter((item) => {
            return Cart.validateItem(item)
        })

        const cart = new Cart({ itemCount: 0, totalSpent: 0, items: validItems })
        cart.updateTotalAndCount()

        return cart
    }
}
