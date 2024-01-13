import { NextRequest, NextResponse } from "next/server"
import { addCartItemController } from "@/@core/backend/main/factories/controllers/cart/addCartItemControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const body = await req.json()

    const authResponse = await authorizationMiddleware.handle({ headers: { authorization } })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { statusCode, headers, ...responseRest } = await addCartItemController.handle({
        body,
        user: { id: authResponse.data.id, type: authResponse.data.type }
    })

    return NextResponse.json(responseRest, { status: statusCode, headers })
}
