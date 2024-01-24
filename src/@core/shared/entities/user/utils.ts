import { UserProps } from "./user"
import { schemaFromType } from "../helpers"
import z from "zod"
import { ExternalUserProps } from "./externalUser"

export const nameRegexp = /^[A-zÀ-ú\s]+$/
export const passwordRegexp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%+<>,.?-]).+$/g

export const nameMessage = "can only have letters"
export const nameLengthMessage = "must have at least 5 character(s)"

export const passwordLengthMessage = "must have at least 8 character(s)"
export const passwordMessage = "must contain letters, numbers and 1 especial character"

export const emailZodSchema = z.string().trim().email("is invalid")

export const userNameZodSchema = z
    .string()
    .trim()
    .min(6, nameLengthMessage)
    .refine((name) => name.match(nameRegexp), { message: nameMessage, path: [""] })

export const passwordZodSchema = z
    .string()
    .min(8, passwordLengthMessage)
    .refine((password) => password.match(passwordRegexp), {
        message: passwordMessage,
        path: [""]
    })

export const userZodSchema = schemaFromType<UserProps>()(
    z.object({
        email: emailZodSchema,
        password: passwordZodSchema,
        name: userNameZodSchema,
        images: z
            .object({
                profile: z.string().trim().url().nullable()
            })
            .strict()
    })
).strict()

export const externalUserZodSchema = schemaFromType<ExternalUserProps>()(
    userZodSchema.omit({ name: true, password: true }).extend({
        name: z.string().trim().min(1)
    })
).strict()
