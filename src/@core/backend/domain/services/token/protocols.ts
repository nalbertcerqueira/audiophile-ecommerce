import { UserType } from "@/@core/shared/entities/cart/cart"

export interface TokenPayload {
    id: string
    sessionType: UserType
}
