import { UserProps } from "@/@core/shared/entities/user/user"
import {
    imageFileZodSchema,
    phoneZodSchema,
    userZodSchema
} from "@/@core/shared/entities/user/utils"
import z from "zod"

interface UserProfileSchema
    extends Partial<Omit<UserProps, "email" | "password" | "profileImg">> {
    phone?: string
    profileImg?: File
}

const zodUserContactSchema = z.object({
    phone: phoneZodSchema(false),
    profileImg: imageFileZodSchema
})

export const zodUserProfileSchema: z.ZodSchema<UserProfileSchema> = userZodSchema
    .pick({
        firstName: true,
        lastName: true,
        profileImg: true
    })
    .merge(zodUserContactSchema)
    .partial()
    .strict()