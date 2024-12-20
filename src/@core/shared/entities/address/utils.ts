import { zipCodeRegexp } from "../constants"
import { ZodHelper } from "../helpers"
import { AddressProps } from "./address"
import z from "zod"

export const addressZodSchema = ZodHelper.schemaFromType<AddressProps>()(
    z.object({
        address: ZodHelper.string("Address", 8),
        country: ZodHelper.string("Country name", 4),
        city: ZodHelper.string("City", 4),
        zipCode: ZodHelper.string("Zip code", 5).refine(
            (zipCode) => zipCode.match(zipCodeRegexp),
            { message: "Zip code must contain only numbers" }
        )
    })
).strict()
