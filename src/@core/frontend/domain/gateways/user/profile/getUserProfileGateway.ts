import { UserOrGuest } from "./protocols"

export interface GetUserProfileGateway {
    getProfile(): Promise<UserOrGuest>
}
