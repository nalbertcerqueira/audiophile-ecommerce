import { AddressFields, ProfileFields } from "./types"
import { addressZodSchema } from "@/@core/shared/entities/address/utils"
import {
    imageFileZodSchema,
    phoneZodSchema,
    userZodSchema
} from "@/@core/shared/entities/user/utils"
import z from "zod"

export const profileSchema: z.ZodType<ProfileFields> = userZodSchema
    .pick({ firstName: true, lastName: true })
    .merge(z.object({ phone: phoneZodSchema, profileImg: imageFileZodSchema.optional() }))
    .strict()

export const addressSchema: z.ZodType<AddressFields> = addressZodSchema
