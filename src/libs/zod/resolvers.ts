import { FieldValues, ResolverResult } from "react-hook-form"
import z from "zod"

export function zodErrorFormatter<T extends z.ZodError<any>>(error: T) {
    const errorMap = error.errors.reduce((acc: Record<string, any>, error) => {
        const fieldName = error.path.join("")
        const fieldNameWithSpace = error.path.join("").replace(/([A-Z])/g, " $1")
        const formattedFieldName = fieldNameWithSpace.split(" ").reduce((acc, name, i) => {
            if (i === 0) {
                acc += `${name[0].toUpperCase()}${name.slice(1)}`
            } else {
                acc += ` ${name.toLowerCase()}`
            }
            return acc
        }, "")

        if (!(fieldName in acc)) {
            acc[fieldName] = {
                message: `${formattedFieldName} ${error.message}`.trim(),
                type: error.code
            }
        }
        return acc
    }, {})

    return errorMap
}

export function customZodResolver<T extends z.Schema<any, any>>(schema: T) {
    return function <TFieldValues extends FieldValues>(
        values: TFieldValues
    ): Promise<ResolverResult<TFieldValues>> {
        const validationResult = schema.safeParse(values)

        if (!validationResult.success) {
            const zodErrorMap = zodErrorFormatter(validationResult.error)

            return Promise.resolve({ errors: zodErrorMap, values: {} })
        }

        return Promise.resolve({ errors: {}, values })
    }
}
