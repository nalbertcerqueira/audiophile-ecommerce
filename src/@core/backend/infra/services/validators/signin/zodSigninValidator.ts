import { userZodSchema } from "@/@core/shared/entities/user/utils"
import { UserProps } from "@/@core/shared/entities/user/user"
import { ZodSchema } from "zod"

type SigninSchema = Pick<UserProps, "email" | "password">

export const zodSigninSchema: ZodSchema<SigninSchema> = userZodSchema.pick({
    email: true,
    password: true
})
