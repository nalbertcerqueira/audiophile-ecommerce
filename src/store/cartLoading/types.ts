export interface CartLoadingState {
    isLoading: boolean
    currentProductIds: string[]
}

export interface CartLoadingActions {
    type: "ENABLE" | "DISABLE" | "CLEAR"
    payload?: { productId: string }
}
