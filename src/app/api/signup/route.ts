import { generateCustomZodErrors } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { dbAddUserUseCase } from "@/@core/backend/main/factories/usecases/user/dbAddUserFactory"
import { NextRequest, NextResponse } from "next/server"
import { passwordZodValidator, userZodSchema } from "@/@core/shared/entities/user/utils"

const signupValidator = userZodSchema
    .pick({ name: true, email: true, password: true })
    .extend({ passwordConfirmation: passwordZodValidator })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"]
    })

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validationResult = signupValidator.safeParse(body)

        if (validationResult.success) {
            const { name, email, password } = validationResult.data
            const isUserCreated = await dbAddUserUseCase.execute({ name, email, password })
            if (isUserCreated) {
                return NextResponse.json({ data: null }, { status: 201 })
            }

            return NextResponse.json(
                { errors: [`user with email ${body.email} is already registered`] },
                { status: 409 }
            )
        }

        const errors = generateCustomZodErrors(validationResult.error, 1)
        return NextResponse.json({ errors }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
