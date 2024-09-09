import { createSlice } from "@reduxjs/toolkit"
import { getUserAddress, getUserProfile, updateUserAddress, updateUserProfile } from "./thunks"
import { UserState } from "./types"
import { AppState } from "../store"

const userInitialState: UserState = {
    status: "loading",
    isLogged: false,
    profile: { id: "", type: "guest" },
    address: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getUserProfile.rejected, (state) => {
                return { ...state, status: "settled" }
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                const payload = action.payload

                if (payload.type === "guest") {
                    const profile = { id: payload.id, type: payload.type }
                    return { ...state, isLogged: false, status: "settled", profile }
                }
                if (payload.type === "authenticated" || payload.type === "external") {
                    return { ...state, isLogged: true, status: "settled", profile: payload }
                }

                return state
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                return { ...state, status: "settled", profile: action.payload }
            })
            .addCase(getUserAddress.fulfilled, (state, action) => {
                const address = action.payload
                return { ...state, address: address ? { ...address } : null }
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                return { ...state, address: action.payload }
            })
})

export const userReducer = userSlice.reducer

export const selectUserStatus = (state: AppState) => state.user.status
export const selectUserProfile = (state: AppState) => state.user.profile
export const selectUserAddress = (state: AppState) => state.user.address
