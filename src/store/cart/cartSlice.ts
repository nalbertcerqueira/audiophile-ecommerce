import { AppState } from "../store"
import { addCartItem, clearCart, fetchCart, removeCartItem } from "./thunks"
import { settledAction, CartThunkPayload } from "./types"
import { CartState } from "./types"
import { createSlice, UnknownAction } from "@reduxjs/toolkit"

function isCartSettledAction(action: UnknownAction): action is settledAction {
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
                const { productId } = action.meta.arg.itemRef
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
                const { productId } = action.meta.arg.itemRef
                return {
                    ...state,
                    status: {
                        ...state.status,
                        busyProducts: [...busyProducts, productId]
                    }
                }
            })
            .addMatcher(isCartSettledAction, (state, action) => {
                const busyProducts = state.status.busyProducts
                action.meta.arg
                const arg = action.meta.arg as { itemRef: { productId: string } } | undefined
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
                                busyProducts: arg?.itemRef.productId
                                    ? busyProducts.filter((id) => id !== arg.itemRef.productId)
                                    : busyProducts
                            }
                        }
                    }
                    case "rejected": {
                        return {
                            ...state,
                            status: {
                                state: "settled",
                                busyProducts: arg?.itemRef.productId
                                    ? busyProducts.filter((id) => id !== arg.itemRef.productId)
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
export const selectCartItems = (state: AppState) => state.cart.items
export const selectCartStatus = (state: AppState) => state.cart.status.state
export const selectCartItemsLength = (state: AppState) => state.cart.items.length
export const selectBusyProductsLength = (state: AppState) =>
    state.cart.status.busyProducts.length
