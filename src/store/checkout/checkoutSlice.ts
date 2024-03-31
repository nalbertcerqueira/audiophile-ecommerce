import { AppState } from "../store"
import { createOrder, fetchTaxes } from "./thunks"
import { CheckoutState, CheckoutStatus } from "./types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const checkoutInitialState: CheckoutState = {
    order: { data: null, status: "idle" },
    taxes: { data: { shipping: 0, vat: 0 }, status: "loading" }
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: checkoutInitialState,
    reducers: {
        setCheckoutStatus: (
            state,
            action: PayloadAction<{ taxes?: CheckoutStatus; order?: CheckoutStatus }>
        ) => {
            return {
                order: {
                    ...state.order,
                    status: action.payload.order || state.order.status
                },
                taxes: {
                    ...state.taxes,
                    status: action.payload.taxes || state.taxes.status
                }
            }
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(createOrder.pending, (state) => {
                return { ...state, order: { ...state.order, status: "loading" } }
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                return { ...state, order: { ...state.order, data: action.payload } }
            })
            .addCase(fetchTaxes.fulfilled, (state, action) => {
                return { ...state, taxes: { ...state.taxes, data: action.payload } }
            })
            .addMatcher(createOrder.settled, (state) => {
                return { ...state, order: { ...state.order, status: "idle" } }
            })
})

export const { setCheckoutStatus } = checkoutSlice.actions
export const checkoutReducer = checkoutSlice.reducer

export const selectOrderStatus = (state: AppState) => state.checkout.order.status
export const selectTaxesStatus = (state: AppState) => state.checkout.taxes.status
