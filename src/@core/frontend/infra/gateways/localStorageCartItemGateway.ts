import { CartProduct } from "@/@core/shared/entities/cart"
import { GetCartItemGateway } from "../../domain/gateways/getCartItemGateway"
import { UpdateCartItemsGateway } from "../../domain/gateways/updateCartItemsGateway"

interface LocalStorageItem {
    productId: string
    quantity: number
}

export class LocalStorageCartItemGateway
    implements GetCartItemGateway, UpdateCartItemsGateway
{
    constructor(private readonly key: string) {}

    public update(items: CartProduct[]): void {
        const quantityList = items.map(({ productId, quantity }) => {
            return { productId, quantity }
        })
        localStorage.setItem(this.key, JSON.stringify(quantityList))
    }

    public async getById(itemId: string): Promise<CartProduct | null> {
        const response = await fetch(`/api/cart/items/${itemId}`)

        if (response.ok) {
            const foundItem = (await response.json()) as { data: CartProduct }
            return foundItem.data
        }

        return null
    }

    public async getAll(): Promise<CartProduct[]> {
        const serializedData = localStorage.getItem(this.key)

        if (!serializedData) {
            return []
        }

        const apiResponse = await fetch("/api/cart/items")
        const apiData = (await apiResponse.json()) as { data: CartProduct[] }

        try {
            const storageData = JSON.parse(serializedData) as LocalStorageItem[]
            const quantityMap = storageData.reduce((acc: Record<string, number>, item) => {
                acc[item.productId] = item.quantity
                return acc
            }, {})

            return apiData.data.reduce((acc: CartProduct[], product) => {
                if (product.productId in quantityMap) {
                    const quantity = quantityMap[product.productId]
                    acc.push({ ...product, quantity: (product.quantity += quantity) })
                }
                return acc
            }, [])
        } catch {
            return []
        }
    }
}
