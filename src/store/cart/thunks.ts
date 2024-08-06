import { removeCartItemUseCase } from "@/@core/frontend/main/usecases/cart/removeCartItemFactory"
import { addCartItemUseCase } from "@/@core/frontend/main/usecases/cart/addCartItemFactory"
import { clearCartUseCase } from "@/@core/frontend/main/usecases/cart/clearCartFactory"
import { Cart, CartProps } from "@/@core/shared/entities/cart/cart"
import { getCartUseCase } from "@/@core/frontend/main/usecases/cart/getCartFactory"
import { CartProduct } from "@/@core/shared/entities/cart/cartItem"
import { createAsyncThunk } from "@reduxjs/toolkit"

type CartThunkProps = ReturnType<typeof mapCartToState>

interface CartActionParams {
    cartProps: CartProps
    item: Pick<CartProduct, "productId" | "quantity">
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
    async ({ cartProps, item }) => {
        const newCart = await addCartItemUseCase.execute({ cartProps, item })
        return mapCartToState(newCart)
    }
)

export const removeCartItem = createAsyncThunk<CartThunkProps, CartActionParams>(
    "cart/removeItem",
    async ({ cartProps, item }) => {
        const newCart = await removeCartItemUseCase.execute({ cartProps, item })
        return mapCartToState(newCart)
    }
)

function mapCartToState(cart: Cart | null) {
    if (cart) {
        const { items } = cart.toJSON()
        return { items, itemCount: cart.countItems(), totalSpent: cart.calculateTotalSpent() }
    }
}
