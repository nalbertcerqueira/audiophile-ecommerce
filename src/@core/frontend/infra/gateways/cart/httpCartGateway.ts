import { GetCartGateway } from "@/@core/frontend/domain/gateways/cart/getCartGateway"
import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { CartItem, CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { HttpGatewayResponse, RequestDetails } from "../protocols"
import { AddCartItemGateway } from "@/@core/frontend/domain/gateways/cart/addCartItemGateway"
import { RemoveCartItemGateway } from "@/@core/frontend/domain/gateways/cart/removeCartItemGateway"
import { ClearCartGateway } from "@/@core/frontend/domain/gateways/cart/clearCartGateway"
import { UnauthorizedError } from "@/@core/frontend/infra/errors"
import { UpdateCartItemGateway } from "@/@core/frontend/domain/gateways/cart/updateCartItemGateway"

export class HttpCartGateway
    implements
        GetCartGateway,
        AddCartItemGateway,
        RemoveCartItemGateway,
        ClearCartGateway,
        UpdateCartItemGateway
{
    constructor(private readonly baseApiUrl: string) {}

    public async get(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart`

        const cart = await this.submitRequest({
            method: "GET",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return cart
    }

    public async clearCart(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items`

        const cart = await this.submitRequest({
            method: "DELETE",
            url: fullUrl,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return cart
    }

    public async addItem(productId: string, quantity: number): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items`
        const body = { productId: productId, quantity }

        const cart = await this.submitRequest({
            method: "POST",
            url: fullUrl,
            body: body,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return cart
    }

    public async updateItem(item: Pick<CartProduct, "productId" | "quantity">): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items/${item.productId}`
        const body = { quantity: item.quantity }

        const cart = await this.submitRequest({
            method: "PATCH",
            url: fullUrl,
            body: body,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return cart
    }

    public async removeItem(productId: string, quantity: number): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items/${productId}`
        const body = { quantity }

        const cart = await this.submitRequest({
            method: "DELETE",
            url: fullUrl,
            body: body,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        return cart
    }

    private async submitRequest(request: RequestDetails): Promise<Cart> {
        const { url, method, headers, body } = request

        const response = await fetch(url, {
            method: method,
            body: body && JSON.stringify(body),
            headers: headers
        })

        const responseData = await response.json()

        if (response.status === 401) {
            throw new UnauthorizedError("User unauthorized")
        }

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success", CartProps>

        const items = data.items.map((item) => new CartItem(item))
        return new Cart({ items })
    }
}
