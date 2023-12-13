import { dbAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbAuthorizationFactory"
import { dbGuestAuthorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/dbGuestAuthorizationFactory"
import { dbClearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbClearCartFactory"
import { dbGetCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbGetCartFactory"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const sessionToken = req.headers.get("authorization")?.split(" ")[1]

    try {
        if (sessionToken) {
            const [authenticatedUser, guestUser] = await Promise.allSettled([
                dbAuthorizationUseCase.execute(sessionToken),
                dbGuestAuthorizationUseCase.execute(sessionToken)
            ])

            if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
                const { id } = authenticatedUser.value.toJSON()
                const cart = await dbGetCartUseCase.execute(id, "authenticated")
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }

            if (guestUser.status === "fulfilled" && guestUser.value) {
                const { id } = guestUser.value
                const cart = await dbGetCartUseCase.execute(id, "guest")
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }
        }

        const unauthorizedMsg =
            "Unauthorized. You need valid credentials to access this content"
        const unauthorizedHeaders = { "WWW-Authenticate": 'Bearer realm="protected resource"' }

        return NextResponse.json(
            { errors: [unauthorizedMsg] },
            { status: 401, headers: unauthorizedHeaders }
        )
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const sessionToken = req.headers.get("authorization")?.split(" ")[1]

    try {
        if (sessionToken) {
            const [authenticatedUser, guestUser] = await Promise.allSettled([
                dbAuthorizationUseCase.execute(sessionToken),
                dbGuestAuthorizationUseCase.execute(sessionToken)
            ])

            if (authenticatedUser.status === "fulfilled" && authenticatedUser.value) {
                const { id } = authenticatedUser.value.toJSON()
                const cart = await dbClearCartUseCase.execute(id, "authenticated")
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
            }

            if (guestUser.status === "fulfilled" && guestUser.value) {
                const { id } = guestUser.value
                const cart = await dbClearCartUseCase.execute(id, "guest")
                return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
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
