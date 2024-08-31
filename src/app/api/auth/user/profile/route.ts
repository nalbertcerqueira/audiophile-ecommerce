import { guestSessionController } from "@/@core/backend/main/factories/controllers/session/guestSessionControllerFactory"
import { updateUserProfileController } from "@/@core/backend/main/factories/controllers/user/profile/updateUserProfileControllerFactory"
import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { authenticatedAuthMiddleware } from "@/@core/backend/main/factories/middlewares/authenticatedAuthMiddlewareFactory"
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

export async function PUT(req: NextRequest) {
    const formData = await req.formData()
    const body = Object.fromEntries([...formData.entries()])

    const authorization = req.headers.get("authorization") as string
    const authResponse = await authenticatedAuthMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { statusCode, headers, ...responseRest } = await updateUserProfileController.handle({
        body,
        user: { id: authResponse.data.id, type: authResponse.data.type }
    })

    return NextResponse.json(responseRest, { status: statusCode, headers })
}
