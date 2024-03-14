import { UserType } from "@/@core/shared/entities/user/user"

export interface TokenPayload {
    id: string
    sessionType: UserType
}
