import { updateUserProfileUseCase } from "@/@core/frontend/main/usecases/user/updateUserProfileFactory"
import { GetUserProfileOutputDTO } from "@/@core/frontend/usecases/user/profile/getUserProfileUseCase"
import { getUserProfileUseCase } from "@/@core/frontend/main/usecases/user/getUserProfileFactory"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { DefaultUser } from "@/@core/frontend/domain/gateways/user/profile/protocols"
import { UpdateUserProfileInputDTO } from "@/@core/frontend/usecases/user/profile/updateUserProfileUseCase"

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

export const updateUserProfile = createAsyncThunk<DefaultUser, UpdateUserProfileInputDTO>(
    "user/updateUserProfile",
    async (profileData) => {
        const profile = await updateUserProfileUseCase.execute(profileData)
        return profile
    }
)
