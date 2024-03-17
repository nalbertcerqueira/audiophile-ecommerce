import { MutableRefObject } from "react"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { CartProps } from "@/@core/shared/entities/cart/cart"
import { CartLoadingState } from "@/store/cartLoading/types"
import { CartLoadingActions } from "@/store/cartLoading/types"

export interface ActionOptions {
    emitToast: boolean
}

export interface CustomCart extends CartProps {
    totalSpent: number
    itemCount: number
}

export interface CartAdditionParams {
    cart: Cart | null
    productId: string
    quantity: number
}

export interface CartContextProps {
    cart: CustomCart
    cartStatus: CartLoadingState
    requestCount: MutableRefObject<number>
    addItem: (productId: string, quantity: number, options?: ActionOptions) => Promise<boolean>
    clearCart: () => Promise<boolean>
    removeItem: (productId: string, quantity: number) => Promise<boolean>
    isCartBusy: (productId: string, quantity?: number) => boolean
    setCartStatus: (action: CartLoadingActions) => void
}
