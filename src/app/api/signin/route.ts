import { singinController } from "@/@core/backend/main/factories/controllers/signin/signinControllerFactory"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("authorization") as string
    const response = await singinController.handle({
        body: await req.json(),
        headers: { authorization }
    })
    const { statusCode, headers, ...responseRest } = response

    return NextResponse.json(responseRest, { status: statusCode, headers: headers })
}
