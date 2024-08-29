import { lengthErrorMessage, requiredErrorMessage } from "./errors"
import z from "zod"

export function createStringSchema(fieldName: string, { min }: { min: number }) {
    return z
        .string({ required_error: requiredErrorMessage(fieldName) })
        .trim()
        .min(min, lengthErrorMessage(fieldName, "min", min))
        .refine((input) => input.replace(/ /g, "").length >= min, {
            message: lengthErrorMessage(fieldName, "min", min),
            path: [""]
        })
}
