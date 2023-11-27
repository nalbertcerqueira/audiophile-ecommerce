import { UserProps } from "./user"
import z from "zod"

export const nameRegexp = /^[A-Za-z]*[0-9]?[A-Za-z]*[0-9]?[A-Za-z]*$/g
export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g

export const nameMessage = "cannot have more than 2 numbers"
export const nameLengthMessage = "must have at least 5 character(s)"

export const passwordLengthMessage = "must have at least 8 character(s)"
export const passwordMessage = "must contain letters, numbers and 1 especial character"

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        id: z.string().trim().min(24),
        email: z.string().trim().email("is invalid"),
        password: z
            .string()
            .trim()
            .min(8, passwordLengthMessage)
            .refine((password) => password.match(passwordRegexp), {
                message: passwordMessage,
                path: [""]
            }),
        name: z
            .string()
            .trim()
            .min(5, nameLengthMessage)
            .refine((name) => name.match(nameRegexp), { message: nameMessage, path: [""] }),
        images: z.object({
            profile: z.string().trim().url().nullable(),
            profileThumb: z.string().trim().url().nullable()
        })
    })
).strict()

export function schemaFromType<T>() {
    return <S extends z.ZodType<T, any, any>>(arg: S) => arg
}
