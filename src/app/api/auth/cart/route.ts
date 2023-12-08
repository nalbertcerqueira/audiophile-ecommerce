import { authorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authorizationFactory"
import { clearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/clearCartFactory"
import { getCartUseCase } from "@/@core/backend/main/factories/usecases/cart/getCartFactory"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const accessToken = req.headers.get("authorization")?.split(" ")[1]

    try {
        if (accessToken) {
            const foundUser = await authorizationUseCase.execute(accessToken)

            if (foundUser) {
                const { id } = foundUser.toJSON()
                const cart = await getCartUseCase.execute(id)
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
    const accessToken = req.headers.get("authorization")?.split(" ")[1]

    try {
        if (accessToken) {
            const foundUser = await authorizationUseCase.execute(accessToken)

            if (foundUser) {
                const { id } = foundUser.toJSON()
                const cart = await clearCartUseCase.execute(id)

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
