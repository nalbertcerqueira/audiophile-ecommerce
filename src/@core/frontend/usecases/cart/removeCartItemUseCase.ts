import { Cart } from "../../../shared/entities/cart"
import { GetCartItemGateway } from "../../domain/gateways/getCartItemGateway"
import { UpdateCartItemsGateway } from "../../domain/gateways/updateCartItemsGateway"

export class RemoveCartItemUseCase {
    constructor(
        private readonly updateCartItemsGateway: UpdateCartItemsGateway,
        private readonly cartItemGateway: GetCartItemGateway
    ) {}

    public async execute(itemId: string): Promise<Cart> {
        const cartItems = await this.cartItemGateway.getAll()

        const validItems = cartItems.filter((item) => {
            return Cart.validateItem(item)
        })

        const newCart = new Cart({ itemCount: 0, totalSpent: 0, items: validItems })

        newCart.removeItem(itemId)
        newCart.updateTotalAndCount()

        this.updateCartItemsGateway.update(newCart.toJSON().items)

        return newCart
    }
}
