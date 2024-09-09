import { updateUserProfileUseCase } from "@/@core/frontend/main/usecases/user/updateUserProfileFactory"
import { GetUserProfileOutputDTO } from "@/@core/frontend/usecases/user/profile/getUserProfileUseCase"
import { getUserProfileUseCase } from "@/@core/frontend/main/usecases/user/getUserProfileFactory"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { DefaultUser } from "@/@core/frontend/domain/gateways/user/profile/protocols"
import { UpdateUserProfileInputDTO } from "@/@core/frontend/usecases/user/profile/updateUserProfileUseCase"
import { AddressProps } from "@/@core/shared/entities/address/address"
import { getAddressUseCase } from "@/@core/frontend/main/usecases/address/getAddressUseCaseFactory"
import { updateAddressUseCase } from "@/@core/frontend/main/usecases/address/updateAddressUseCaseFactory"

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
    async (data) => {
        const profile = await updateUserProfileUseCase.execute(data)
        return profile
    }
)

export const getUserAddress = createAsyncThunk<AddressProps | null>(
    "user/getUserAddress",
    async () => {
        const address = await getAddressUseCase.execute()
        return address ? address.toJSON() : null
    }
)

export const updateUserAddress = createAsyncThunk<AddressProps, AddressProps>(
    "user/updateUserAddress",
    async (data) => {
        const address = await updateAddressUseCase.execute(data)
        return address.toJSON()
    }
)
