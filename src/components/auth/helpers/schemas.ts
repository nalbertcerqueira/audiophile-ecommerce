import z from "zod"
import { AuthFormFields } from "../types/types"
import { userZodSchema } from "@/@core/shared/entities/user/utils"

export const loginSchema: z.ZodType<AuthFormFields<"login">> = userZodSchema.pick({
    email: true,
    password: true
})

// export const signupSchema: z.ZodType<AuthFormFields<"signup">> = userZodSchema
//     .pick({
//         name: true,
//         email: true,
//         password: true
//     })
//     .merge(z.object({ passwordConfirmation: z.string().trim().refine((password) => password.match(passwordRegexp), passwordMessage) }))
//     .strict()
//     .refine(
//         (values) => {
//             return values.password === values.passwordConfirmation
//         },
//         { message: "Passwords don't match", path: [""] }
//     )
