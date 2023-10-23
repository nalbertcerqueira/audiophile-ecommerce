import { Cart } from "../../../shared/entities/cart"
import { GetCartItemGateway } from "../../domain/gateways/getCartItemGateway"
import { UpdateCartItemsGateway } from "../../domain/gateways/updateCartItemsGateway"

type ItemToAdd = {
    productId: string
    quantity: number
}

export class AddCartItemUseCase {
    constructor(
        private readonly updateCartItemsGateway: UpdateCartItemsGateway,
        private readonly getCartItemGateway: GetCartItemGateway
    ) {}

    public async execute(item: ItemToAdd): Promise<Cart | null> {
        if (item.quantity <= 0) {
            return null
        }

        const [cartItems, cartItemToAdd] = await Promise.all([
            this.getCartItemGateway.getAll(),
            this.getCartItemGateway.getById(item.productId)
        ])

        const validItems = cartItems.filter((item) => Cart.validateItem(item))
        const newCart = new Cart({ itemCount: 0, totalSpent: 0, items: validItems })

        if (cartItemToAdd) {
            newCart.addItem({ ...cartItemToAdd, quantity: item.quantity })
        }

        newCart.updateTotalAndCount()
        this.updateCartItemsGateway.update(newCart.toJSON().items)

        return newCart
    }
}
