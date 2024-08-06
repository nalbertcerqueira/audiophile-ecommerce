import { updateCartItemController } from "@/@core/backend/main/factories/controllers/cart/updateCartItemControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const authorization = req.headers.get("authorization") as string
    const body = await req.json()

    const authResponse = await authorizationMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { statusCode, headers, ...responseRest } = await updateCartItemController.handle({
        body,
        params,
        user: { id: authResponse.data.id, type: authResponse.data.type }
    })

    return NextResponse.json(responseRest, { status: statusCode, headers })
}
