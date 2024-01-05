import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

type NextAuthUser = DefaultSession["user"] & {
    id?: string | null
}

declare module "next-auth" {
    interface Session {
        user?: NextAuthUser
        accessToken?: string | null
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string
    }
}
