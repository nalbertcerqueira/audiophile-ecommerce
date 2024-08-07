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

const cartInitialState: CartState = {
    items: [],
    totalSpent: 0,
    itemCount: 0,
    status: {
        state: "idle",
        busyProducts: []
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchCart.pending, (state) => {
                return { ...state, status: { ...state.status, state: "loading" } }
            })
            .addCase(clearCart.pending, (state) => {
                return { ...state, status: { state: "loading", busyProducts: [] } }
            })
            .addCase(removeCartItem.pending, (state, action) => {
                const busyProducts = state.status.busyProducts
                const { productId } = action.meta.arg
                return {
                    ...state,
                    status: {
                        ...state.status,
                        busyProducts: [...busyProducts, productId]
                    }
                }
            })
            .addCase(addCartItem.pending, (state, action) => {
                const busyProducts = state.status.busyProducts
                return {
                    ...state,
                    status: {
                        ...state.status,
                        busyProducts: [...busyProducts, action.meta.arg.productId]
                    }
                }
            })
            .addMatcher(isCartSettledAction, (state, action) => {
                const busyProducts = state.status.busyProducts
                const arg = action.meta.arg as { productId: string } | undefined
                switch (action.meta.requestStatus) {
                    case "fulfilled": {
                        const payload = action.payload as CartThunkPayload
                        return {
                            ...state,
                            items: payload.items,
                            itemCount: payload.itemCount,
                            totalSpent: payload.totalSpent,
                            status: {
                                state: "settled",
                                busyProducts: arg?.productId
                                    ? busyProducts.filter((id) => id !== arg.productId)
                                    : busyProducts
                            }
                        }
                    }
                    case "rejected": {
                        return {
                            ...state,
                            status: {
                                state: "settled",
                                busyProducts: arg?.productId
                                    ? busyProducts.filter((id) => id !== arg.productId)
                                    : busyProducts
                            }
                        }
                    }
                    default: {
                        return state
                    }
                }
            })
})

export const cartReducer = cartSlice.reducer

export const selectCart = (state: AppState) => state.cart
export const selectCartStatus = (state: AppState) => state.cart.status.state
export const selectCartItemsLength = (state: AppState) => state.cart.items.length
export const selectBusyProductsLength = (state: AppState) =>
    state.cart.status.busyProducts.length
