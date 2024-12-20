import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { UserProps } from "@/@core/shared/entities/user/user"
import { ZodSchema } from "zod"
import { ZodHelper } from "@/@core/shared/entities/helpers"

interface SignupSchema extends Omit<UserProps, "profileImg" | "phone"> {
    passwordConfirmation: string
}

export const zodSignupSchema: ZodSchema<SignupSchema> = userZodSchema
    .pick({ firstName: true, lastName: true, email: true, password: true })
    .extend({ passwordConfirmation: ZodHelper.password("Password confirmation") })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"]
    })
