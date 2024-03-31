import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { checkoutReducer } from "./checkout"
import { cartReducer } from "./cart/cartSlice"
import { modalsReducer } from "./modals/modalsSlice"

const appReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer,
    modals: modalsReducer
})

export function makeStore() {
    const appStore = configureStore({
        reducer: appReducer,
        devTools: false
    })

    return appStore
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type AppState = ReturnType<typeof appReducer>
