import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"

export type UserBasicInfo = AuthenticatedUser | GuestUser

export interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export interface SessionContextProps {
    isLogged: boolean
    isLoading: boolean
    user: AuthenticatedUser | GuestUser | null
    logout: () => void
    getFirstName: () => string | null
}
