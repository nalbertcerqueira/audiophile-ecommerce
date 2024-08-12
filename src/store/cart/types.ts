import { CartProps } from "@/@core/shared/entities/cart/cart"
import { AsyncThunk } from "@reduxjs/toolkit"

export type CartStatus = "idle" | "loading" | "settled"

export interface CartState {
    items: CartProps["items"]
    totalSpent: number
    itemCount: number
    status: {
        state: CartStatus
        busyProducts: string[]
    }
}

export type CartThunkPayload = Pick<CartState, "items" | "itemCount" | "totalSpent">

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type settledAction = ReturnType<
    GenericAsyncThunk["fulfilled"] | GenericAsyncThunk["rejected"]
>
