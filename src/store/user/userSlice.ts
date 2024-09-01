import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUserProfile } from "./thunks"
import { UserState } from "./types"
import { AppState } from "../store"

const userInitialState: UserState = {
    status: "loading",
    isLogged: false,
    profile: { id: "", type: "guest" }
}

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setUserStatus(state, action: PayloadAction<UserState["status"]>) {
            return { ...state, status: action.payload }
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getUserProfile.rejected, (state) => {
                return { ...state, status: "settled" }
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                const payload = action.payload

                if (typeof payload === "object") {
                    const type = payload.type
                    const isLogged = type === "authenticated" || type === "external"
                    return { ...state, isLogged, status: "settled", profile: payload }
                }

                return state
            })
})

export const { setUserStatus } = userSlice.actions
export const userReducer = userSlice.reducer

export const selectUserStatus = (state: AppState) => state.user.status
export const selectUserProfile = (state: AppState) => state.user.profile
