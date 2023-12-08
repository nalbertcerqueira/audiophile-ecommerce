import { authorizationUseCase } from "@/@core/backend/main/factories/usecases/auth/authorizationFactory"
import { getCartByUserIdUseCase } from "@/@core/backend/main/factories/usecases/cart/getCartByUserIdFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const accessToken = req.headers.get("authorization")?.split(" ")[1]

    try {
        if (accessToken) {
            const foundUser = await authorizationUseCase.execute(accessToken)

            if (foundUser) {
                const { id } = foundUser.toJSON()
                const cart = await getCartByUserIdUseCase.execute(id)
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
