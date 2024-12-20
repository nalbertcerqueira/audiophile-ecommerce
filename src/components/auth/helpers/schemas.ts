import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { AuthFormFields } from "../types/types"
import { ZodHelper } from "@/@core/shared/entities/helpers"
import z from "zod"

export const signinSchema: z.ZodType<AuthFormFields<"signin">> = userZodSchema.pick({
    email: true,
    password: true
})

export const signupSchema: z.ZodType<AuthFormFields<"signup">> = userZodSchema
    .pick({
        firstName: true,
        lastName: true,
        email: true,
        password: true
    })
    .extend({ passwordConfirmation: ZodHelper.password("Password confirmation") })
    .strict()
    .refine(
        (values) => {
            return values.password === values.passwordConfirmation
        },
        {
            message: "Passwords don't match",
            path: ["passwordConfirmation"]
        }
    )
