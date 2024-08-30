import {
    DefaultUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/profile/getUserProfileGateway"

export type UserBasicInfo = DefaultUser | GuestUser

export interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export interface SessionContextProps {
    isLogged: boolean
    isLoading: boolean
    user: DefaultUser | GuestUser | null
    logout: () => void
    getFirstName: () => string | null
}
