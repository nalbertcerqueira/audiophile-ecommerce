import z from "zod"
import { EntityValidationResult } from "./protocols"
import {
    allowedImgTypes,
    maxUploadSizeInBytes,
    nameRegexp,
    passwordRegexp,
    phoneRegexp
} from "./constants"
import parsePhoneNumberFromString from "libphonenumber-js"

export class ZodHelper {
    public static userName(fieldName: string, min: number) {
        return ZodHelper.string(fieldName, min).refine((value) => value.match(nameRegexp), {
            message: `${fieldName} can only have letters`
        })
    }

    public static number(fieldName: string, min: number, max?: number) {
        const baseSchema = z
            .number()
            .gte(min, { message: `${fieldName} must be greater than or equal to ${min}` })

        if (max === undefined) return baseSchema

        return baseSchema.lte(max, {
            message: `${fieldName} must be lesser than or equal to ${max}`
        })
    }

    public static string(fieldName: string, min: number) {
        return z
            .string()
            .trim()
            .min(min, `${fieldName} must have at least ${min} character(s)`)
            .refine((value) => value.replace(/[^À-ú\w]|_/g, "").length >= min, {
                message: `${fieldName} must have at least ${min} character(s) without symbols`
            })
    }

    public static imageFile(fieldName: string) {
        return z
            .instanceof(File, { message: `${fieldName} must be an instance of File` })
            .refine((value) => (value ? allowedImgTypes.includes(value.type) : true), {
                message: `${fieldName} accepts only ${allowedImgTypes.map((type) => type.split("/")[1]).join(", ")} formats`
            })
            .refine((value) => (value ? value.size <= maxUploadSizeInBytes : true), {
                message: `${fieldName} size must be lesser than ${(maxUploadSizeInBytes / 1024) * 1024}MB`
            })
    }

    public static phone(fieldName: string) {
        return z
            .string()
            .refine((value) => (value ? value.match(phoneRegexp) : true), {
                message: `${fieldName} must contain only numbers`
            })
            .refine((value) => parsePhoneNumberFromString(`+${value}`)?.isValid(), {
                message: "Invalid phone number"
            })
    }

    public static password(fieldName: string) {
        return z
            .string()
            .min(8, `${fieldName} must have at least 8 character(s)`)
            .refine((value) => value.match(passwordRegexp), {
                message: `${fieldName} must contain letters, numbers and 1 especial character`
            })
    }

    public static email(fieldName: string) {
        return z
            .string({ required_error: `${fieldName} is a required field` })
            .email({ message: `${fieldName} is invalid` })
            .trim()
            .toLowerCase()
    }

    //Gera um schema do zod a partir de um tipo genérico <T>
    public static schemaFromType<T>() {
        return <S extends z.ZodType<T, any, any>>(arg: S) => arg
    }

    //Gera um array de erros a partir do error recebido pelo zod
    public static generateCustomZodErrors<T extends z.ZodError<any>>(
        error: T,
        errorsPerField: number
    ): string[] {
        const errorCountMap: Record<string, number> = {}

        const errors = error.errors.map((error) => {
            const joinedPath = error.path.join("")
            const pathLength = error.path.length

            if (errorCountMap[joinedPath] >= errorsPerField) {
                return null
            }

            const formattedPath = error.path.reduce((acc, value, i) => {
                if (typeof value === "number") {
                    acc += `[${value}].`
                } else if (
                    pathLength > 1 &&
                    i === pathLength - 1 &&
                    typeof value === "string"
                ) {
                    acc += `.${value}`.replace(/^\./, "")
                } else {
                    acc += value[0].toUpperCase() + value.slice(1)
                }
                return acc
            }, "")

            if (typeof errorCountMap[joinedPath] === "number") errorCountMap[joinedPath] += 1
            else errorCountMap[joinedPath] = 1

            return `${formattedPath || ""} ${error.message.toLocaleLowerCase()}`.trim()
        })

        return errors.filter((error) => !!error) as string[]
    }
}

export abstract class Entity<Props extends Record<string, any>> {
    public abstract toJSON(): Props

    protected validate(
        props: any,
        schema: z.ZodObject<Record<string, any>>
    ): EntityValidationResult<Props> {
        const validation = schema.safeParse(props)

        if (!validation.success) {
            return {
                success: false,
                errors: ZodHelper.generateCustomZodErrors(validation.error, 1)
            }
        }

        return { success: true, data: validation.data as any }
    }
}
