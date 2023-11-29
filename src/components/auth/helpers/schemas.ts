import z from "zod"
import { AuthFormFields } from "../types/types"
import { passwordZodValidator, userZodSchema } from "@/@core/shared/entities/user/utils"

export const loginSchema: z.ZodType<AuthFormFields<"login">> = userZodSchema.pick({
    email: true,
    password: true
})

export const signupSchema: z.ZodType<AuthFormFields<"signup">> = userZodSchema
    .pick({
        name: true,
        email: true,
        password: true
    })
    .extend({ passwordConfirmation: passwordZodValidator })
    .strict()
    .refine(
        (values) => {
            return values.password === values.passwordConfirmation
        },
        { message: "and password don't match", path: ["passwordConfirmation"] }
    )
