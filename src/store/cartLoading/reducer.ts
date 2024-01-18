import { CartLoadingActions, CartLoadingState } from "./types"

export function cartLoadingReducer(state: CartLoadingState, action: CartLoadingActions) {
    switch (action.type) {
        case "ENABLE": {
            const productId = action.payload?.productId
            return {
                isLoading: true,
                currentProductIds: productId
                    ? [...state.currentProductIds, productId]
                    : state.currentProductIds
            }
        }
        case "DISABLE": {
            const productId = action.payload?.productId
            return {
                isLoading: false,
                currentProductIds: productId
                    ? state.currentProductIds.filter((id) => id !== productId)
                    : state.currentProductIds
            }
        }
        case "CLEAR": {
            return { isLoading: true, currentProductIds: [] }
        }
        default: {
            return state
        }
    }
}
