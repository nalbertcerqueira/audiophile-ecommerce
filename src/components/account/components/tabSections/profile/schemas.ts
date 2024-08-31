import { createStringSchema } from "@/libs/zod/utils"
import { AddressFields, ProfileFields } from "./types"
import {
    imageFileZodSchema,
    phoneZodSchema,
    userZodSchema
} from "@/@core/shared/entities/user/utils"
import { lengthErrorMessage } from "@/libs/zod/errors"
import z from "zod"

export const profileSchema: z.ZodType<ProfileFields> = userZodSchema
    .pick({ firstName: true, lastName: true })
    .merge(z.object({ phone: phoneZodSchema(false), profileImg: imageFileZodSchema }))
    .strict()

export const addressSchema: z.ZodType<AddressFields> = z
    .object({
        address: createStringSchema("Address", { min: 8 }),
        country: createStringSchema("Country", { min: 4 }),
        city: createStringSchema("City", { min: 4 }),
        zipCode: z
            .string({ required_error: "Zip code is required" })
            .min(5, lengthErrorMessage("Zip code", "min", 5))
    })
    .strict()
