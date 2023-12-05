import { generateCustomZodErrors } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { loginUseCase } from "@/@core/backend/main/factories/usecases/auth/loginFactory"
import { NextRequest, NextResponse } from "next/server"

const loginValidator = userZodSchema.pick({ email: true, password: true })

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()
        const validationResult = loginValidator.safeParse({ email, password })

        if (!validationResult.success) {
            const errors = generateCustomZodErrors(validationResult.error, 1)
            return NextResponse.json({ errors }, { status: 400 })
        }

        const token = await loginUseCase.execute(validationResult.data)
        if (token) {
            return NextResponse.json({ data: token }, { status: 200 })
        }

        const unauthorizedHeaders = { "WWW-Authenticate": 'Bearer realm="protected resource"' }
        return NextResponse.json(
            { errors: ["Invalid email or password"] },
            { status: 401, headers: unauthorizedHeaders }
        )
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
