import { UserProps } from "./user"
import z from "zod"

export const nameRegexp = /^[A-Za-z]*[0-9]?[A-Za-z]*[0-9]?[A-Za-z]*$/g
export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g

export const nameMessage = "cannot have more than 2 numbers"
export const passwordMessage = "must have at least 1 number and 1 especial character"

export function schemaFromType<T>() {
    return <S extends z.ZodType<T, any, any>>(arg: S) => arg
}

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        id: z.string().trim().min(24),
        email: z.string().trim().email(),
        password: z
            .string()
            .trim()
            .min(8)
            .refine((password) => password.match(passwordRegexp), passwordMessage),
        name: z
            .string()
            .trim()
            .min(5)
            .refine((name) => name.match(nameRegexp), nameMessage),
        images: z.object({
            profile: z.string().trim().url().nullable(),
            profileThumb: z.string().trim().url().nullable()
        })
    })
).strict()
