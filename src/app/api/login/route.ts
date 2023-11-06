import { userZodSchema } from "@/@core/backend/domain/entities/user/utils"
import { zodErrorFormater } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { loginUseCase } from "@/@core/backend/main/factories/auth/loginFactory"
import { NextRequest, NextResponse } from "next/server"

const loginValidator = userZodSchema.pick({ email: true, password: true })

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    const validationResult = loginValidator.safeParse({ email, password })

    if (!validationResult.success) {
        const errors = zodErrorFormater(validationResult.error)
        return NextResponse.json({ errors }, { status: 400 })
    }

    const token = await loginUseCase.execute(validationResult.data)
    if (token) {
        return NextResponse.json({ data: token }, { status: 200 })
    }

    return NextResponse.json(
        { errors: ["Unauthorized. You need valid credentials to access this content"] },
        { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="protected resource"' } }
    )
}