import { zodErrorFormater } from "@/@core/backend/infra/validators/zod/zod-helpers"
import { addUserUseCase } from "@/@core/backend/main/factories/user/createUserFactory"
import { NextRequest, NextResponse } from "next/server"
import {
    passwordMessage,
    passwordRegexp,
    userZodSchema
} from "@/@core/backend/domain/entities/user/utils"
import z from "zod"

const signupValidator = userZodSchema
    .pick({ name: true, email: true, password: true })
    .extend({
        passwordConfirmation: z
            .string()
            .min(8)
            .trim()
            .refine((password) => password.match(passwordRegexp), passwordMessage)
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "passwords don't match"
    })

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validationResult = signupValidator.safeParse(body)

        if (validationResult.success) {
            const { name, email, password } = validationResult.data
            const newUser = await addUserUseCase.execute({ name, email, password })
            if (newUser) {
                return NextResponse.json({ data: newUser }, { status: 201 })
            }

            return NextResponse.json(
                { errors: [`user with email ${body.email} is already registered`] },
                { status: 409 }
            )
        }

        const errors = zodErrorFormater(validationResult.error)
        return NextResponse.json({ errors }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ errors: [error.message] }, { status: 500 })
    }
}
