import { mongoHelper } from "@/@core/backend/infra/db/mongo/config/mongo-config"
import { createCheckoutOrderCreationController } from "@/@core/backend/main/factories/controllers/order/createCheckoutOrderControllerFactory"
import { authenticatedAuthMiddleware } from "@/@core/backend/main/factories/middlewares/authenticatedAuthMiddlewareFactory"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string

    const authResponse = await authenticatedAuthMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { statusCode, headers, ...responseRest } = authResponse
        return NextResponse.json(responseRest, { status: statusCode, headers })
    }

    const { firstName, lastName, email } = authResponse.data
    const fullName = `${firstName} ${lastName}`

    const session = mongoHelper.startSession()
    const checkoutOrderController = createCheckoutOrderCreationController(session)

    const { statusCode, headers, ...responseRest } = await checkoutOrderController.handle({
        body: { customer: { fullName, email } },
        user: { id: authResponse.data.id, type: authResponse.data.type }
    })

    await session.endSession()
    return NextResponse.json(responseRest, { status: statusCode, headers })
}
