import { NextRequest, NextResponse } from "next/server"
import { signupController } from "@/@core/backend/main/factories/controllers/signup/signupControllerFactory"

export async function POST(req: NextRequest) {
    const response = await signupController.handle({ body: await req.json() })
    const { statusCode, headers, ...responseRest } = response

    return NextResponse.json(responseRest, { status: statusCode, headers: headers })
}
