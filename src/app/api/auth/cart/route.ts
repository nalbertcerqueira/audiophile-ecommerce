import { getCartController } from "@/@core/backend/main/factories/controllers/cart/getCartControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { dbClearCartUseCase } from "@/@core/backend/main/factories/usecases/cart/dbClearCartFactory"
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

export async function DELETE(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const authResponse = await authorizationMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const cart = await dbClearCartUseCase.execute(authResponse.data.id, authResponse.data.type)
    return NextResponse.json({ data: cart.toJSON() }, { status: 200 })
}
