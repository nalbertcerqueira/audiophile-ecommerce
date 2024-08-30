import { createStringSchema } from "@/libs/zod/utils"
import { AddressFields, ProfileFields } from "./types"
import { phoneZodSchema, userZodSchema } from "@/@core/shared/entities/user/utils"
import { lengthErrorMessage } from "@/libs/zod/errors"
import {
    allowedImgMessage,
    allowedImgTypes,
    maxUploadSize,
    maxUploadSizeMessage
} from "./variables"
import z from "zod"

const profileImageSchema = z
    .instanceof(File, { message: "is required" })
    .optional()
    .refine((file) => (file ? allowedImgTypes.includes(file.type) : true), {
        message: allowedImgMessage
    })
    .refine((file) => (file ? file.size <= maxUploadSize : true), {
        message: maxUploadSizeMessage
    })

export const profileSchema: z.ZodType<ProfileFields> = userZodSchema
    .pick({ firstName: true, lastName: true })
    .merge(z.object({ phone: phoneZodSchema(false), profileImg: profileImageSchema }))
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
