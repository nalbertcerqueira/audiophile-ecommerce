import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { getCartController } from "@/@core/backend/main/factories/controllers/cart/getCartControllerFactory"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const authResponse = await authorizationMiddleware.handle({ headers: { authorization } })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { statusCode, headers, ...responseRest } = await getCartController.handle({
        user: {
            id: authResponse.data.id,
            type: authResponse.data.type
        }
    })

    return NextResponse.json(responseRest, { status: statusCode, headers })
}
