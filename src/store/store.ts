import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { checkoutReducer } from "./checkout/index"
import { cartReducer } from "./cart/index"
import { modalsReducer } from "./modals/modalsSlice"
import { userReducer } from "./user/index"

const appReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    modals: modalsReducer
})

export function makeStore() {
    const appStore = configureStore({
        reducer: appReducer,
        devTools: process.env.NODE_ENV !== "production"
    })

    return appStore
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type AppState = ReturnType<typeof appReducer>
