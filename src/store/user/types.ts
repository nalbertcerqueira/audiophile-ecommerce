type UserStatus = "loading" | "settled"

export interface GuestProfileState {
    id: string
    type: "guest"
}

export interface UserProfileState {
    id: string
    email: string
    firstName: string
    lastName: string
    phone: string | null
    profileImg: string | null
    type: "authenticated" | "external"
}

export interface UserAddressState {
    address: string
    country: string
    city: string
    zipCode: string
}

export interface UserState {
    status: UserStatus
    isLogged: boolean
    profile: UserProfileState | GuestProfileState
    address: UserAddressState | null
}
