import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { Cart } from "@/@core/shared/entities/cart/cart"
import { createAsyncThunk } from "@reduxjs/toolkit"

type CartThunkProps = ReturnType<typeof mapCartToState>

interface CartActionParams {
    productId: string
    quantity: number
}

export const clearCart = createAsyncThunk<CartThunkProps, void>("cart/clearCart", async () => {
    const cart = await clearCartUseCase.execute()
    return mapCartToState(cart)
})

export const fetchCart = createAsyncThunk<CartThunkProps, void>("cart/fetchCart", async () => {
    const cart = await getCartUseCase.execute()
    return mapCartToState(cart)
})

export const addCartItem = createAsyncThunk<CartThunkProps, CartActionParams>(
    "cart/addItem",
    async ({ productId, quantity }) => {
        const cart = await addCartItemUseCase.execute({ productId, quantity })
        return mapCartToState(cart)
    }
)

export const removeCartItem = createAsyncThunk<CartThunkProps, CartActionParams>(
    "cart/removeItem",
    async ({ productId, quantity }) => {
        const cart = await removeCartItemUseCase.execute({ productId, quantity })
        return mapCartToState(cart)
    }
)

function mapCartToState(cart: Cart | null) {
    if (cart) {
        const { items } = cart.toJSON()
        return { items, itemCount: cart.getCount(), totalSpent: cart.getTotalSpent() }
    }
}
