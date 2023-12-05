import { Cart, CartProduct } from "@/@core/shared/entities/cart/cart"
import { GetCartGateway } from "../../domain/gateways/cart/getCartGateway"
import { AddCartItemGateway } from "../../domain/gateways/cart/addCartItemGateway"
import { RemoveCartItemGateway } from "../../domain/gateways/cart/removeCartItemGateway"
import { DeleteCartGateway } from "../../domain/gateways/cart/deleteCartGateway"

interface LocalStorageItem {
    productId: string
    quantity: number
}

interface CartItemMap {
    [key: string]: CartProduct
}

export class LocalStorageCartGateway
    implements GetCartGateway, AddCartItemGateway, RemoveCartItemGateway, DeleteCartGateway
{
    private cache: { cartItemMap: CartItemMap } = { cartItemMap: {} }

    constructor(private readonly key: string) {}

    public async get(): Promise<Cart | null> {
        const cartItemMap = await this.generateCartItemMap()
        const localStorageData = this.getLocalStorageItems()

        if (!localStorageData) {
            return null
        }

        try {
            const items = localStorageData.map(({ productId, quantity }) => {
                const cartItem = cartItemMap[productId]
                return cartItem ? { ...cartItem, quantity: quantity } : null
            }) as CartProduct[]

            const cart = new Cart({ itemCount: 0, totalSpent: 0, items: items })
            cart.updateTotalAndCount()

            return cart
        } catch {
            return null
        }
    }

    public async addItem(itemId: string, quantity: number): Promise<Cart> {
        const cart = (await this.get()) || Cart.createEmptyCart()

        if (!cart.addItem(itemId, quantity)) {
            const response = await fetch(`/api/cart-products/${itemId}`)

            if (response.ok) {
                const cartItem = (await response.json()) as { data: CartProduct }
                cart.addItem({ ...cartItem.data, quantity })
            }
        }

        cart.updateTotalAndCount()
        this.save(cart.toJSON().items)
        return cart
    }

    public async removeItem(itemId: string): Promise<Cart> {
        const cart = (await this.get()) || Cart.createEmptyCart()

        cart.removeItem(itemId)
        cart.updateTotalAndCount()

        this.save(cart.toJSON().items)
        return cart
    }

    public async deleteCart(): Promise<Cart> {
        const emptyCart = Cart.createEmptyCart()

        this.save(emptyCart.toJSON().items)
        return emptyCart
    }

    private save(cartItems: CartProduct[]): void {
        const localStorageItems: LocalStorageItem[] = cartItems.map((item) => {
            return { productId: item.productId, quantity: item.quantity }
        })
        localStorage.setItem(this.key, JSON.stringify(localStorageItems))
    }

    private async generateCartItemMap(): Promise<CartItemMap> {
        const emptyCache = Object.keys(this.cache.cartItemMap).length === 0

        if (emptyCache) {
            const response = await fetch("/api/cart-products")
            const items = (await response.json()).data as CartProduct[]

            for (const item of items) {
                this.cache.cartItemMap[item.productId] = { ...item, quantity: 0 }
            }
        }

        return this.cache.cartItemMap
    }

    private getLocalStorageItems(): LocalStorageItem[] | null {
        const serializedData = localStorage.getItem(this.key)

        if (!serializedData) {
            return null
        }

        try {
            const storageData = JSON.parse(serializedData) as LocalStorageItem[]
            return storageData
        } catch {
            return null
        }
    }
}
