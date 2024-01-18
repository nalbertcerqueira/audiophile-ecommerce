import { guestSessionController } from "@/@core/backend/main/factories/controllers/session/guestSessionControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const authResponse = await authorizationMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = await guestSessionController.handle()
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    return NextResponse.json({ data: authResponse.data }, { status: 200 })
}
