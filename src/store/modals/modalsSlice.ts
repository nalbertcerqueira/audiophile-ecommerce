import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ModalsState } from "./types"

const modalsInitialState: ModalsState = {
    cart: { isOpen: false },
    mobileMenu: { isOpen: false }
}

const modalsSlice = createSlice({
    name: "modals",
    initialState: modalsInitialState,
    reducers: {
        closeModal(state, action: PayloadAction<keyof ModalsState>) {
            const target = action.payload
            return { ...state, [target]: { isOpen: false } }
        },
        toggleModal(state, action: PayloadAction<keyof ModalsState>) {
            const target = action.payload
            return { ...state, [target]: { isOpen: !state[target].isOpen } }
        }
    }
})

export const { closeModal, toggleModal } = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer
