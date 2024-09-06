import { GetUserProfileOutputDTO } from "@/@core/frontend/usecases/user/profile/getUserProfileUseCase"
import { getUserProfileUseCase } from "@/@core/frontend/main/usecases/user/getUserProfileFactory"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getUserProfile = createAsyncThunk<GetUserProfileOutputDTO>(
    "user/getUserProfile",
    async () => {
        const profile = await getUserProfileUseCase.execute()
        const userType = profile.type

        if (userType === "guest" && profile.token) {
            localStorage.setItem("accessToken", profile.token)
        }

        return profile
    }
)