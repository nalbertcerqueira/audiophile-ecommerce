import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbAuthorizationFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization")
    const sessionToken = authHeader?.split(" ")[1]

    try {
        if (sessionToken) {
            const foundUser = await dbAuthorizationUseCase.execute(sessionToken)

            if (foundUser) {
                const { id, email, name } = foundUser.toJSON()

                return NextResponse.json({ data: { id, name, email } }, { status: 200 })
            }
        }

        const unauthorizedHeaders = { "WWW-Authenticate": 'Bearer realm="protected resource"' }
        const unauthorizedMsg =
            "Unauthorized: you need valid credentials to access this conontent"

        return NextResponse.json(
            { errors: [unauthorizedMsg] },
            { status: 401, headers: unauthorizedHeaders }
        )
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
