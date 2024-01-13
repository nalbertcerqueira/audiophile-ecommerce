import { authorizationMiddleware } from "@/@core/backend/main/factories/middlewares/authorizationMiddlewareFactory"
import { dbGuestSessionUseCase } from "@/@core/backend/main/factories/usecases/auth/guestUser/dbGuestSessionUseCase"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const authResponse = await authorizationMiddleware.handle({
        headers: { authorization }
    })

    if (authResponse.statusCode !== 200) {
        const { token } = await dbGuestSessionUseCase.execute()
        return NextResponse.json({ data: token }, { status: 200 })
    }

    return NextResponse.json({ data: authResponse.data }, { status: 200 })
}
