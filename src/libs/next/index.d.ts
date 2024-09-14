import { UserType } from "@/@core/shared/entities/user/user"
import { NextRequest as Request } from "next/server"

declare module "next/server" {
    interface NextRequest extends Request {
        user?: {
            id: string
            type: UserType
        }
    }
}
