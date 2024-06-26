import { passwordZodSchema } from "@/@core/shared/entities/user/utils"
import { AuthFormFields } from "../types/types"
import { User } from "@/@core/shared/entities/user/user"
import z from "zod"

export const signinSchema: z.ZodType<AuthFormFields<"signin">> = User.userSchema.pick({
    email: true,
    password: true
})

export const signupSchema: z.ZodType<AuthFormFields<"signup">> = User.userSchema
    .pick({
        firstName: true,
        lastName: true,
        email: true,
        password: true
    })
    .extend({ passwordConfirmation: passwordZodSchema })
    .strict()
    .refine(
        (values) => {
            return values.password === values.passwordConfirmation
        },
        { message: "and password don't match", path: ["passwordConfirmation"] }
    )
