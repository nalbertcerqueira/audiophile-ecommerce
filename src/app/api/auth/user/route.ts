import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbAuthorizationFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbGuestAuthorizationFactory"
import { dbGuestSessionUseCase } from "@/@core/backend/main/factories/usecases/auth/dbGuestSessionUseCase"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    const sessionToken = authHeader?.split(" ")[1]

    try {
        if (sessionToken) {
            const [authenticatedUser, guestUser] = await Promise.allSettled([
                dbAuthorizationUseCase.execute(sessionToken),
                dbGuestAuthorizationUseCase.execute(sessionToken)
            ])

            if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
                const { id, email, name } = authenticatedUser.value
                return NextResponse.json(
                    { data: { id, name, email, type: "authenticated" } },
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
