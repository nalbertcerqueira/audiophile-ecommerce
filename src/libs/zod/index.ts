import z from "zod"
import { FieldValues, ResolverResult } from "react-hook-form"
import { ResolverOptions } from "react-hook-form"

export interface ErrorInfo {
    type: string | number
    message?: string
    ref?: HTMLElement
}

export type ErrorMap = Record<string, ErrorInfo>

export function zodErrorFormater<T extends z.ZodError<any>>(error: T) {
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
    return function <TFieldValues extends FieldValues, TContext>(
        values: TFieldValues,
        context: TContext | undefined,
        options: ResolverOptions<TFieldValues>
    ): Promise<ResolverResult<TFieldValues>> {
        const validationResult = schema.safeParse(values)

        if (!validationResult.success) {
            const zodErrorMap = zodErrorFormater(validationResult.error)

            for (const field in options.fields) {
                if (zodErrorMap[field]) {
                    zodErrorMap[field].ref = options.fields[field].ref
                }
            }

            return Promise.resolve({ errors: zodErrorMap, values: {} })
        }

        return Promise.resolve({ errors: {}, values })
    }
}
