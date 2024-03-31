import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { checkoutReducer } from "./checkout"
import { cartReducer } from "./cart/cartSlice"

const appReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer
})

export function makeStore() {
    const appStore = configureStore({
        reducer: appReducer
    })

    return appStore
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type AppState = ReturnType<typeof appReducer>
