import { AppState } from "../store"
import { addCartItem, clearCart, fetchCart, removeCartItem } from "./thunks"
import { FulfilledAction, CartThunkPayload } from "./types"
import { CartState } from "./types"
import { createSlice, UnknownAction } from "@reduxjs/toolkit"

function isCartSettledAction(action: UnknownAction): action is FulfilledAction {
    const isCartAction = action.type.startsWith("cart")
    const isSettled = action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")
    return typeof action.type === "string" && isCartAction && isSettled
}

const initialState: CartState = {
    items: [],
    totalSpent: 0,
    itemCount: 0,
    status: {
        state: "fetching",
        busyProducts: []
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchCart.pending, (state) => {
                return { ...state, status: { ...state.status, state: "fetching" } }
            })
            .addCase(clearCart.pending, (state) => {
                return { ...state, status: { state: "clearing", busyProducts: [] } }
            })
            .addCase(removeCartItem.pending, (state, action) => {
                const busyProducts = state.status.busyProducts
                const { productId } = action.meta.arg
                return {
                    ...state,
                    status: {
                        state: "updating",
                        busyProducts: [...busyProducts, productId]
                    }
                }
            })
            .addCase(addCartItem.pending, (state, action) => {
                const busyProducts = state.status.busyProducts
                return {
                    ...state,
                    status: {
                        state: "updating",
                        busyProducts: [...busyProducts, action.meta.arg.productId]
                    }
                }
            })
            .addMatcher(isCartSettledAction, (state, action) => {
                if (action.payload) {
                    const payload = action.payload as CartThunkPayload
                    const arg = action.meta.arg as { productId: string } | undefined
                    const busyProducts = state.status.busyProducts
                    return {
                        ...state,
                        items: payload.items,
                        itemCount: payload.itemCount,
                        totalSpent: payload.totalSpent,
                        status: {
                            state: "idle",
                            busyProducts: arg?.productId
                                ? busyProducts.filter((id) => id !== arg.productId)
                                : busyProducts
                        }
                    }
                }
                return state
            })
})

export const cartReducer = cartSlice.reducer

export const selectCart = (state: AppState) => state.cart
export const selectCartStatus = (state: AppState) => state.cart.status.state
export const selectCartItemsLength = (state: AppState) => state.cart.items.length
