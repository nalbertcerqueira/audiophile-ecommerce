import { GetCartGateway } from "@/@core/frontend/domain/gateways/cart/getCartGateway"
import { Cart, CartProps, createCart } from "@/@core/shared/entities/cart/cart"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { HttpGateway } from "../protocols"
import { AddCartItemGateway } from "@/@core/frontend/domain/gateways/cart/addCartItemGateway"
import { ClearCartGateway } from "@/@core/frontend/domain/gateways/cart/clearCartGateway"
import { UpdateCartItemGateway } from "@/@core/frontend/domain/gateways/cart/updateCartItemGateway"

export class HttpCartGateway
    extends HttpGateway
    implements GetCartGateway, AddCartItemGateway, ClearCartGateway, UpdateCartItemGateway
{
    constructor(private readonly baseApiUrl: string) {
        super()
    }

    public async get(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart`

        const cartProps = await this.submitRequest<CartProps>({
            method: "GET",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return createCart({ items: cartProps.items })
    }

    public async clearCart(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items`

        const cartProps = await this.submitRequest<CartProps>({
            method: "DELETE",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return createCart({ items: cartProps.items })
    }

    public async addItem(productId: string, quantity: number): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items`
        const body = { productId: productId, quantity }

        const cartProps = await this.submitRequest<CartProps>({
            method: "POST",
            url: fullUrl,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return createCart({ items: cartProps.items })
    }

    public async updateItem(
        itemRef: Pick<CartProduct, "productId" | "quantity">
    ): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items/${itemRef.productId}`
        const body = { quantity: itemRef.quantity }

        const cartProps = await this.submitRequest<CartProps>({
            method: "PATCH",
            url: fullUrl,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return createCart({ items: cartProps.items })
    }
}
