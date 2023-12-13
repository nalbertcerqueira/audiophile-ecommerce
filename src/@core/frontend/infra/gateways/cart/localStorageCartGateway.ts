import { Cart, CartProduct } from "@/@core/shared/entities/cart/cart"
import { GetCartGateway } from "../../../domain/gateways/cart/getCartGateway"
import { AddCartItemGateway } from "../../../domain/gateways/cart/addCartItemGateway"
import { RemoveCartItemGateway } from "../../../domain/gateways/cart/removeCartItemGateway"
import { ClearCartGateway } from "../../../domain/gateways/cart/clearCartGateway"

import { HttpGatewayResponse } from "../protocols"

interface LocalStorageCartItem {
    productId: string
    quantity: number
}

interface CartItemMap {
    [key: string]: CartProduct
}

export class LocalStorageCartGateway
    implements GetCartGateway, AddCartItemGateway, RemoveCartItemGateway, ClearCartGateway
{
    private cache: { cartItemMap: CartItemMap } = { cartItemMap: {} }

    constructor(private readonly key: string) {}

    public async get(): Promise<Cart> {
        const cartItemMap = await this.generateCartItemMap()
        const localStorageData = this.getLocalStorageItems()

        if (!localStorageData) {
            return Cart.empty()
        }

        const promises = localStorageData.map(({ productId }) => {
            return async () => {
                const res = await fetch(`/api/products/${productId}?type=shortProduct`)
                return await res.json()
            }
        })

        const allSetled = await Promise.allSettled(promises.map((promise) => promise()))
        console.log(allSetled)

        try {
            const items = localStorageData.map(({ productId, quantity }) => {
                const cartItem = cartItemMap[productId]
                return cartItem ? { ...cartItem, quantity: quantity } : null
            }) as CartProduct[]

            const cart = new Cart({ itemCount: 0, totalSpent: 0, items: items })
            cart.updateTotalAndCount()

            return cart
        } catch {
            return Cart.empty()
        }
    }

    public async clearCart(): Promise<Cart> {
        const emptyCart = Cart.empty()

        this.save(emptyCart)
        return emptyCart
    }

    public async addItem(productId: string, quantity: number): Promise<Cart> {
        const cart = (await this.get()) || Cart.empty()
        const isIncrementing = cart.addItem(productId, quantity)

        if (!isIncrementing) {
            const response = await fetch(`/api/products/${productId}?type=shortProduct`)
            const responseData = await response.json()

            if (!response.ok && responseData.errors) {
                const { errors } = responseData as HttpGatewayResponse<"failed">
                throw new Error(errors.join(","))
            }

            const { data } = responseData as HttpGatewayResponse<"success">
            cart.addItem({ ...data, quantity })
        }

        cart.updateTotalAndCount()
        this.save(cart)
        return cart
    }

    public async removeItem(productId: string, quantity: number): Promise<Cart> {
        const cart = (await this.get()) || Cart.empty()

        cart.removeItem(productId, quantity)
        cart.updateTotalAndCount()

        this.save(cart)
        return cart
    }

    private save(cart: Cart): void {
        const items = cart.toJSON().items
        const localStorageItems: LocalStorageCartItem[] = items.map((item) => {
            return { productId: item.productId, quantity: item.quantity }
        })

        localStorage.setItem(this.key, JSON.stringify(localStorageItems))
    }

    private async generateCartItemMap(): Promise<CartItemMap> {
        const emptyCache = Object.keys(this.cache.cartItemMap).length === 0

        if (emptyCache) {
            const response = await fetch("/api/products?type=shortProduct")
            const items = (await response.json()).data as CartProduct[]

            for (const item of items) {
                this.cache.cartItemMap[item.productId] = { ...item, quantity: 0 }
            }
        }

        return this.cache.cartItemMap
    }

    private getLocalStorageItems(): LocalStorageCartItem[] | null {
        const serializedData = localStorage.getItem(this.key)

        if (!serializedData) {
            return null
        }

        try {
            const storageData = JSON.parse(serializedData) as LocalStorageCartItem[]
            return storageData
        } catch {
            return null
        }
    }
}
