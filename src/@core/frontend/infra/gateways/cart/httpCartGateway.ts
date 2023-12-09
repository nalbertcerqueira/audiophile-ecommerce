import { GetCartGateway } from "@/@core/frontend/domain/gateways/cart/getCartGateway"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { HttpGatewayResponse } from "../protocols"
import { AddCartItemGateway } from "@/@core/frontend/domain/gateways/cart/addCartItemGateway"
import { RemoveCartItemGateway } from "@/@core/frontend/domain/gateways/cart/removeCartItemGateway"
import { ClearCartGateway } from "@/@core/frontend/domain/gateways/cart/clearCartGateway"

export class HttpCartGateway
    implements GetCartGateway, AddCartItemGateway, RemoveCartItemGateway, ClearCartGateway
{
    constructor(private readonly baseApiUrl: string) {}

    public async get(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart`

        const response = await fetch(fullUrl, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">
        return new Cart(data)
    }

    public async clearCart(): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart`

        const response = await fetch(fullUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">
        return new Cart(data)
    }

    public async addItem(itemId: string, quantity: number): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart`
        const body = { productId: itemId, quantity }

        const response = await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">
        return new Cart(data)
    }

    public async removeItem(itemId: string, quantity: number): Promise<Cart> {
        const accessToken = localStorage.getItem("accessToken")
        const fullUrl = `${this.baseApiUrl}/cart/items/${itemId}`
        const body = { quantity }

        const response = await fetch(fullUrl, {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })

        const responseData = await response.json()

        if (!response.ok && responseData.errors) {
            const { errors } = responseData as HttpGatewayResponse<"failed">
            throw new Error(errors.join(","))
        }

        const { data } = responseData as HttpGatewayResponse<"success">
        return new Cart(data)
    }
}
