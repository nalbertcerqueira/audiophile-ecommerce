import { ZodHelper } from "@/@core/shared/entities/helpers"
import { UserProps } from "@/@core/shared/entities/user/user"
import { userZodSchema } from "@/@core/shared/entities/user/utils"
import z from "zod"

interface UserProfileSchema extends Omit<UserProps, "email" | "password" | "profileImg"> {
    phone: string
    profileImg?: File
}

const zodUserContactSchema = z.object({
    phone: ZodHelper.phone("Phone number"),
    profileImg: ZodHelper.imageFile("Profile image").optional()
})

export const zodUserProfileSchema: z.ZodSchema<UserProfileSchema> = userZodSchema
    .pick({ firstName: true, lastName: true, profileImg: true })
    .merge(zodUserContactSchema)
    .strict()
