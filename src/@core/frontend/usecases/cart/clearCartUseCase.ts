import { Cart } from "../../../shared/entities/cart"
import { UpdateCartItemsGateway } from "../../domain/gateways/updateCartItemsGateway"

export class ClearCartUseCase {
    constructor(private readonly cartItemGateway: UpdateCartItemsGateway) {}

    public execute(): Cart {
        const emptyCart = Cart.createEmptyCart()
        this.cartItemGateway.update(emptyCart.toJSON().items)

        return emptyCart
    }
}
