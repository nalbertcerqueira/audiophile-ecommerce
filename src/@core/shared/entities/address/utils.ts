import { schemaFromType, createZodStringSchema } from "../helpers"
import { AddressProps } from "./address"
import z from "zod"

export const zipCodeRegexp = /^[0-9]+$/
export const zipCodeMessage = "must contain only numbers"

export const addressZodSchema = schemaFromType<AddressProps>()(
    z.object({
        address: createZodStringSchema(8),
        country: createZodStringSchema(4),
        city: createZodStringSchema(4),
        zipCode: createZodStringSchema(5).refine((zipCode) => zipCode.match(zipCodeRegexp), {
            message: zipCodeMessage
        })
    })
).strict()
