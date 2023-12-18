import { UserProps } from "./user"
import { schemaFromType } from "../helpers"
import z from "zod"

export const nameRegexp = /^[A-zÀ-ú\s]+$/
export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g

export const nameMessage = "can only have letters"
export const nameLengthMessage = "must have at least 5 character(s)"

export const passwordLengthMessage = "must have at least 8 character(s)"
export const passwordMessage = "must contain letters, numbers and 1 especial character"

export const passwordZodValidator = z
    .string()
    .min(8, passwordLengthMessage)
    .refine((password) => password.match(passwordRegexp), {
        message: passwordMessage,
        path: [""]
    })

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        id: z.string().trim().min(1),
        email: z.string().trim().email("is invalid"),
        password: passwordZodValidator,
        name: z
            .string()
            .trim()
            .min(6, nameLengthMessage)
            .refine((name) => name.match(nameRegexp), { message: nameMessage, path: [""] }),
        images: z.object({
            profile: z.string().trim().url().nullable(),
            profileThumb: z.string().trim().url().nullable()
        })
    })
).strict()
