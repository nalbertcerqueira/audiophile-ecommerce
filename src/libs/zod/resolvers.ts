import { toCapitalized } from "@/utils/helpers"
import { FieldValues, ResolverResult } from "react-hook-form"
import z from "zod"

export function customZodResolver<T extends z.Schema<any, any>>(schema: T) {
    return function <TFieldValues extends FieldValues>(
        values: TFieldValues
    ): Promise<ResolverResult<TFieldValues>> {
        const validationResult = schema.safeParse(values)

        if (validationResult.success) return Promise.resolve({ errors: {}, values })

        const errorMap: Record<string, any> = {}

        for (const error of validationResult.error.errors) {
            if (error.path[0] in errorMap) continue

            errorMap[error.path[0]] = {
                message: toCapitalized(error.message),
                type: error.code
            }
        }

        return Promise.resolve({ errors: errorMap, values: {} })
    }
}
