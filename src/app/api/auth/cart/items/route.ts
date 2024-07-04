import { NextRequest, NextResponse } from "next/server"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { addCartItemController } from "@/@core/backend/main/factories/controllers/cart/addCartItemControllerFactory"
import { clearCartController } from "@/@core/backend/main/factories/controllers/cart/clearCartControllerFactory"

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

export async function DELETE(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const authResponse = await authorizationMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { statusCode, headers, ...responseRest } = await clearCartController.handle({
        user: {
            id: authResponse.data.id,
            type: authResponse.data.type
        }
    })

    return NextResponse.json(responseRest, { status: statusCode, headers })
}
