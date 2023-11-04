import { loginUseCase } from "@/@core/backend/main/factories/auth/loginFactory"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const token = await loginUseCase.execute({ email, password })

    if (token) {
        return NextResponse.json({ data: token }, { status: 200 })
    }

    return NextResponse.json(
        { errors: ["Unauthorized. You need valid credentials to access this content"] },
        { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="protected resource"' } }
    )
}
