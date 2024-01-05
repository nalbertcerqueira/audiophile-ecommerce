import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authenticatedUser/dbAuthorizationFactory"
import { dbExternalAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/externalUser/dbExternalAuthorizationFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestAuthorizationFactory"
import { dbGuestSessionUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestSessionUseCase"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    const sessionToken = authHeader?.split(" ")[1]

    try {
        if (sessionToken) {
            const [authenticatedUser, guestUser, externalUser] = await Promise.allSettled([
                dbAuthorizationUseCase.execute(sessionToken),
                dbGuestAuthorizationUseCase.execute(sessionToken),
                dbExternalAuthorizationUseCase.execute(sessionToken)
            ])

            if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
                const { id, email, name } = authenticatedUser.value
                return NextResponse.json(
                    { data: { id, name, email, type: "authenticated" } },
                    { status: 200 }
                )
            }

            if (externalUser.status === "fulfilled" && externalUser.value) {
                const { id, name, email } = externalUser.value
                return NextResponse.json(
                    { data: { id, name, email, type: "external" } },
                    { status: 200 }
                )
            }

            if (guestUser.status === "fulfilled" && guestUser.value) {
                const { id } = guestUser.value
                return NextResponse.json({ data: { id, type: "guest" } }, { status: 200 })
            }
        }

        const { token } = await dbGuestSessionUseCase.execute()

        return NextResponse.json({ data: token })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
